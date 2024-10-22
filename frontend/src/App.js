import React, { useState, useEffect } from 'react';

function App() {
  // useState hook to store stock data fetched from the backend
  const [stockData, setStockData] = useState(null);
  
  // useState hook to manage the loading state (true while fetching data)
  const [loading, setLoading] = useState(true);
  
  // useState hook to store the stock symbol (default is 'AAPL')
  const [symbol, setSymbol] = useState('AAPL');

  // useEffect hook is used to perform side effects in function components
  // It runs after the component renders and re-runs when dependencies (like 'symbol') change
  useEffect(() => {
    // Function to fetch stock data from the Go backend
    const fetchStockData = async () => {
      setLoading(true);  // Set loading state to true while data is being fetched

      try {
        // Make a GET request to the Go backend API, passing the stock symbol as a query parameter
        const response = await fetch(`http://localhost:8080/api/stocks?symbol=${symbol}`);
        
        // Parse the response as JSON
        const data = await response.json();

        // Store the fetched stock data in the state
        setStockData(data);
      } catch (error) {
        // Log any errors that occur during the API request
        console.error('Error fetching stock data:', error);
      } finally {
        // Whether the request succeeds or fails, stop the loading state
        setLoading(false);
      }
    };

    // Call the fetchStockData function to fetch stock data when the component mounts
    // or when the 'symbol' value changes
    fetchStockData();
  }, [symbol]);  // The effect will re-run every time 'symbol' changes

  // Log the stock data to check if it's being fetched correctly
  console.log(stockData);

  return (
    <div className="App">
      {/* Page title */}
      <h1>Stock Market Ticker</h1>

      {/* Input field to change the stock symbol */}
      {/* The value is controlled by the 'symbol' state, and any changes update that state */}
      <input
        type="text"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value.toUpperCase())}  // Convert input to uppercase
        placeholder="Enter stock symbol (e.g., AAPL)"
      />
      
      {/* Conditionally render loading message or stock data */}
      {/* If loading is true, display "Loading stock data..." */}
      {/* If not loading and stockData exists, display the stock symbol and price */}
      {loading ? (
        <p>Loading stock data...</p>
      ) : (
        stockData && (
          <div>
            <h2>{stockData.symbol}</h2>  {/* Display the stock symbol */}
            <p>Price: ${stockData.price}</p>  {/* Display the stock price */}
          </div>
        )
      )}
    </div>
  );
}

export default App;
