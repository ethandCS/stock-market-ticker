import React, { useState, useEffect } from 'react';
import ChartComponent from './ChartComponent';
import './App.css'; // Import the updated CSS file

function App() {
  const [symbol, setSymbol] = useState(''); // State to store the stock symbol input
  const [stockData, setStockData] = useState(null); // State to store current stock data
  const [historicalData, setHistoricalData] = useState([]); // State for historical data
  const [error, setError] = useState(''); // State to manage errors

  const backendURL = 'https://stock-market-ticker-ten.vercel.app/';

  // Fetch current stock data from the backend
  const fetchStockData = async (tickerSymbol) => {
    try {
      const response = await fetch(`${backendURL}?symbol=${tickerSymbol}`);
      if (!response.ok) {
        throw new Error('Failed to fetch stock data');
      }
      const data = await response.json();
      setStockData(data);
      setError('');
    } catch (err) {
      setError(err.message);
      setStockData(null);
    }
  };

  // Fetch historical stock data from the backend
  const fetchHistoricalData = async (tickerSymbol) => {
    try {
      const response = await fetch(`${backendURL}/historical?symbol=${tickerSymbol}`);
      if (!response.ok) {
        throw new Error('Failed to fetch historical data');
      }
      const data = await response.json();
      setHistoricalData(data.prices);
      setError('');
    } catch (err) {
      setError(err.message);
      setHistoricalData([]);
    }
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (symbol) {
      fetchStockData(symbol.toUpperCase());
      fetchHistoricalData(symbol.toUpperCase());
    }
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Stock Market Ticker</h1>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            placeholder="Enter stock symbol (e.g., AAPL)"
            className="input-field"
          />
          <button type="submit" className="submit-button">Get Stock Price</button>
        </form>
      </div>
      <div className="content">
        <div className="stock-info">
          {error && <p className="error-message">{error}</p>}
          {stockData && (
            <>
              <h2>{stockData.symbol}</h2>
              <p>Price: ${stockData.price}</p>
              <p>Timestamp: {stockData.timestamp}</p>
              <p>52-Week High: ${stockData.high_52week}</p>
              <p>52-Week Low: ${stockData.low_52week}</p>
              <p>Market Cap: ${stockData.market_cap}</p>
              <p>PE Ratio: {stockData.pe_ratio}</p>
            </>
          )}
        </div>
        <div className="chart-container">
          {historicalData.length > 0 && (
            <>
              <h3>Stock Price History</h3>
              <ChartComponent historicalData={historicalData} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
