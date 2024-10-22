// import React, { useState, useEffect } from 'react';

// function App() {
//   // useState hook to store stock data fetched from the backend
//   const [stockData, setStockData] = useState(null);

//   // useState hook to manage the loading state (true while fetching data)
//   const [loading, setLoading] = useState(false);

//   // useState hook to store the stock symbol the user enters
//   const [symbol, setSymbol] = useState('AAPL');

//   // useState hook to store the session watchlist
//   const [watchlist, setWatchlist] = useState([]);

//   // Function to fetch stock data from the Go backend
//   const fetchStockData = async (tickerSymbol) => {
//     setLoading(true);  // Set loading state to true while data is being fetched

//     try {
//       // Make a GET request to the Go backend API, passing the stock symbol as a query parameter
//       const response = await fetch(`http://localhost:8080/api/stocks?symbol=${tickerSymbol}`);
//       const data = await response.json();

//       // Store the fetched stock data in the state
//       setStockData(data);

//     } catch (error) {
//       // Log any errors that occur during the API request
//       console.error('Error fetching stock data:', error);
//     } finally {
//       // Whether the request succeeds or fails, stop the loading state
//       setLoading(false);
//     }
//   };

//   // Function to handle form submission when a stock symbol is entered
//   const handleFormSubmit = (e) => {
//     e.preventDefault();  // Prevent the form from reloading the page

//     // Call the fetchStockData function with the entered symbol
//     if (symbol) {
//       fetchStockData(symbol.toUpperCase());  // Convert the symbol to uppercase for consistency
//     }
//   };

//   // Function to add stock to the session watchlist
//   const addToWatchlist = () => {
//     // Check if stockData exists and if it's not already in the watchlist
//     if (stockData && !watchlist.some(stock => stock.symbol === stockData.symbol)) {
//       setWatchlist([...watchlist, stockData]);  // Add stock to the watchlist if not already added
//     }
//   };

//   return (
//     <div className="App">
//       {/* Page title */}
//       <h1>Stock Market Ticker</h1>

//       {/* Input field and form for entering stock symbol */}
//       <form onSubmit={handleFormSubmit}>
//         <input
//           type="text"
//           value={symbol}
//           onChange={(e) => setSymbol(e.target.value.toUpperCase())}  // Update the symbol state and convert to uppercase
//           placeholder="Enter stock symbol (e.g., AAPL)"
//         />
//         <button type="submit">Get Stock Price</button>  {/* Submit the form */}
//       </form>

//       {/* Conditionally render loading message, stock data, or no data */}
//       {loading ? (
//         <p>Loading stock data...</p>  // Display loading text if stock data is being fetched
//       ) : stockData ? (
//         <div>
//           {/* Display stock symbol and price */}
//           <h2>{stockData.symbol}</h2>
//           <p>Price: ${stockData.price}</p>
//           <button onClick={addToWatchlist}>Add to Watchlist</button>  {/* Add to watchlist button */}
//         </div>
//       ) : (
//         <p>No stock data available.</p>  // If no stock data, show this message
//       )}

//       {/* Display the session watchlist */}
//       {watchlist.length > 0 && (
//         <div>
//           <h3>Session Watchlist</h3>
//           <ul>
//             {/* Map through the watchlist and display each stock symbol and price */}
//             {watchlist.map((stock, index) => (
//               <li key={index}>
//                 {stock.symbol}: ${stock.price}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

import './App.css';  // Make sure the path is correct based on your file structure
import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';  // Import PapaParse to parse CSV data

function App() {
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [symbol, setSymbol] = useState('');
  const [watchlist, setWatchlist] = useState([]);
  const [mockStocks, setMockStocks] = useState([]);  // Store the parsed mock stock data

  // Load and parse the CSV file on component mount
  useEffect(() => {
    fetch('/mockStocks.csv')  // Fetch the CSV from the public folder
      .then(response => response.text())
      .then(text => {
        Papa.parse(text, {
          header: true,
          complete: (result) => {
            setMockStocks(result.data);  // Store the parsed CSV data in the state
          },
        });
      });
  }, []);

  // Function to fetch stock data from the mock CSV data
  const fetchStockData = async (tickerSymbol) => {
    setLoading(true);

    try {
      // Find the stock data in the parsed CSV data
      const foundStock = mockStocks.find(stock => stock.symbol === tickerSymbol);

      if (foundStock) {
        // If stock is found, use the mock data
        setStockData({
          symbol: foundStock.symbol,
          price: foundStock.price,
        });
      } else {
        // If not found, set stockData to null to show "No stock data available"
        setStockData(null);
      }
    } catch (error) {
      console.error('Error fetching stock data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (symbol) {
      fetchStockData(symbol.toUpperCase());
    }
  };

  // Add stock to the watchlist
  const addToWatchlist = () => {
    if (stockData && !watchlist.some(stock => stock.symbol === stockData.symbol)) {
      setWatchlist([...watchlist, stockData]);
    }
  };

  return (
    <div className="App">
      <h1>Stock Market Ticker</h1>

      {/* Input field for stock symbol */}
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          placeholder="Enter stock symbol (e.g., AAPL)"
          style={{ padding: '10px', fontSize: '16px', width: '250px', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '10px', fontSize: '16px' }}>Get Stock Price</button>
      </form>

      {/* Loading message or stock data */}
      {loading ? (
        <p>Loading stock data...</p>
      ) : stockData ? (
        <div>
          <h2>{stockData.symbol}</h2>
          <p>Price: ${stockData.price}</p>
          <button onClick={addToWatchlist}>Add to Watchlist</button>
        </div>
      ) : (
        <p>No stock data available.</p>
      )}

      {/* Watchlist */}
      {watchlist.length > 0 && (
        <div>
          <h3>Session Watchlist</h3>
          <ul>
            {watchlist.map((stock, index) => (
              <li key={index}>
                {stock.symbol}: ${stock.price}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;