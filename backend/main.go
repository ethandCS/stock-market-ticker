package main

import (
    "encoding/json"  // Package for encoding/decoding JSON
    "fmt"            // Package for formatting strings
    "log"            // Package for logging errors
    "net/http"       // Package for building HTTP servers and clients
    "os"             // Package for accessing environment variables
    "github.com/joho/godotenv"  // External package to load environment variables from .env files
)

// init is a special function that runs before main.
// We use it here to load environment variables from the .env file.
func init() {
    // Load environment variables from the .env file
    err := godotenv.Load()
    if err != nil {
        // If there is an error loading the .env file, log it and stop execution
        log.Fatalf("Error loading .env file")
    }
}

// StockResponse defines the structure of the stock data we want to send to the client.
// It contains a stock symbol (e.g., AAPL) and the stock price.
type StockResponse struct {
    Symbol string `json:"symbol"` // Stock symbol, e.g., AAPL
    Price  string `json:"price"`  // Stock price, e.g., 150.00
}

// FetchStockPrice is the function that handles the /api/stocks endpoint.
// It reads the stock symbol from the request, fetches data from the Alpha Vantage API, and returns the stock price.
func FetchStockPrice(w http.ResponseWriter, r *http.Request) {
    // Get the 'symbol' query parameter from the URL, e.g., /api/stocks?symbol=AAPL
    symbol := r.URL.Query().Get("symbol")
    
    // If no symbol is provided, return a 400 Bad Request error
    if symbol == "" {
        http.Error(w, "Missing symbol parameter", http.StatusBadRequest)
        return
    }

    // Get the Alpha Vantage API key from environment variables
    apiKey := os.Getenv("ALPHA_VANTAGE_API_KEY")
    
    // Construct the URL for the Alpha Vantage API with the stock symbol and API key
    apiURL := fmt.Sprintf("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=%s&apikey=%s", symbol, apiKey)

    // Send an HTTP GET request to the Alpha Vantage API to get stock data
    resp, err := http.Get(apiURL)
    if err != nil {
        // If the API request fails, return a 500 Internal Server Error
        http.Error(w, "Failed to fetch stock data", http.StatusInternalServerError)
        return
    }
    // Close the response body when the function exits to prevent memory leaks
    defer resp.Body.Close()

    // Parse the JSON response from the Alpha Vantage API into a map
    var result map[string]interface{}
    err = json.NewDecoder(resp.Body).Decode(&result)
    if err != nil {
        // If the response cannot be decoded, return a 500 Internal Server Error
        http.Error(w, "Failed to decode JSON response", http.StatusInternalServerError)
        return
    }

    // Check if the response contains the rate-limit message
    if info, exists := result["Information"].(string); exists {
        // If the rate limit is hit, return a 429 Too Many Requests error with the information message
        http.Error(w, info, http.StatusTooManyRequests)
        return
    }

    // Check if the "Global Quote" key exists in the response
    quote, ok := result["Global Quote"].(map[string]interface{})
    if !ok {
        // If no stock data is found, return a 404 Not Found error
        http.Error(w, "No stock data found for the provided symbol", http.StatusNotFound)
        return
    }

    // Extract the price from the JSON response
    price, ok := quote["05. price"].(string)
    if !ok {
        // If the price field is missing, return a 404 Not Found error
        http.Error(w, "Price data not found", http.StatusNotFound)
        return
    }

    // Create a stock data response struct with the symbol and price
    stockData := StockResponse{
        Symbol: symbol,
        Price:  price,
    }

    // Set the response header to indicate we're sending JSON
    w.Header().Set("Content-Type", "application/json")
    
    // Encode the stockData struct into JSON and send it back to the client
    json.NewEncoder(w).Encode(stockData)
}

// The main function is the entry point of the Go application
// It sets up the HTTP server and starts listening for requests
func main() {
    // Handle requests to /api/stocks by calling FetchStockPrice
    http.HandleFunc("/api/stocks", FetchStockPrice)
    
    // Print a message to indicate the server is running
    fmt.Println("Server running on port 8080")
    
    // Start the HTTP server on port 8080 and log any errors
    log.Fatal(http.ListenAndServe(":8080", nil))
}
