# Stock Market Ticker (Web App)

## Project Overview

This project is a full-stack web application built with **Go** (for the backend) and **React** (for the frontend). The app allows users to create a watchlist of stock symbols and fetch real-time stock prices using the **Alpha Vantage API**. Users can interact with the web app to add stocks to their watchlist, remove stocks, and view the latest stock prices.

### Tech Stack

- **Backend**: Go (serving a REST API)
- **Frontend**: React
- **API for Stock Data**: Alpha Vantage API

### Features

- **Add Stocks to Watchlist**: Users can add stock symbols (e.g., AAPL, TSLA) to their watchlist via the web app.
- **Fetch Real-Time Stock Prices**: The backend fetches the latest stock prices from the Alpha Vantage API and provides this data to the React frontend.
- **Display Stock Prices**: Stock prices are displayed on the web page in a user-friendly format.
- **Remove Stocks from Watchlist**: Users can remove unwanted stocks from their watchlist.
- **Error Handling**: Invalid stock symbols or API errors are handled gracefully and presented to the user.

## Agile Planning

We are following an Agile methodology for this project, breaking it down into sprints. Below are the high-level user stories and sprint plans.

### Backlog (User Stories)

| ID  | User Story                                                                                       | Priority |
| --- | ------------------------------------------------------------------------------------------------- | -------- |
| 1   | As a user, I want to input stock symbols into a watchlist on the React web app to track stocks.    | High     |
| 2   | As a user, I want to fetch real-time stock prices from the Go API for my watchlist.                | High     |
| 3   | As a user, I want to display stock prices on the React frontend in a user-friendly format.         | High     |
| 4   | As a user, I want to add and remove stocks from my watchlist dynamically on the web page.          | Medium   |
| 5   | As a user, I want the stock prices to refresh automatically without reloading the page.            | Low      |
| 6   | As a user, I want error handling for invalid stock symbols or API errors.                          | Medium   |

## Sprint Plan

### Sprint 1: Core Functionality

- **Goal**: Set up the Go backend, React frontend, and integrate with the Alpha Vantage API.
- **Tasks**:
  1. Set up Go backend with a REST API (`/api/stocks`).
  2. Set up React frontend to input stock symbols.
  3. Fetch stock prices from the backend using React.
  4. Display stock prices in the frontend.

### Sprint 2: Add Dynamic Features

- **Goal**: Implement dynamic features for managing the watchlist and error handling.
- **Tasks**:
  1. Allow adding/removing stocks from the watchlist.
  2. Implement error handling for invalid stock symbols or API issues.
  3. Optional: Implement periodic updates for real-time stock price refresh.

### Sprint 3: Persistence and Final Polishing

- **Goal**: Implement persistent storage and refine the user interface.
- **Tasks**:
    1. Add persistence (e.g., store the watchlist in a database or browser local storage).
    2. Refine the frontend UI/UX for better user experience.
    3. Ensure proper error messages and edge case handling.
    4. Write unit tests for the backend API.

## How to Run the Project

### Prerequisites

- **Go**: Install Go from [here](https://golang.org/doc/install).
- **Node.js**: Install Node.js and npm from [here](https://nodejs.org/).
- **Alpha Vantage API Key**: Sign up for a free API key [here](https://www.alphavantage.co/support/#api-key).

### Backend (Go) Setup

1. Clone the repository and navigate to the backend folder:
   ```bash
   git clone https://github.com/yourusername/stock-market-ticker-web.git
   cd stock-market-ticker-web/backend
   ```

2. Install Go dependencies and run the Go server:
   ```bash
   go mod tidy
   go run main.go
   ```

### Frontend (React) Setup

1. Navigate to the frontend folder:
   ```bash
   cd ../frontend
   ```

2. Install dependencies and run the React app:
   ```bash
   npm install
   npm start
   ```

3. Open the app in your browser at `http://localhost:3000`.**TO_BE_CHANGED**

### API Documentation

The Go backend exposes the following API endpoint:

- **GET /api/stocks?symbol={SYMBOL}**: Fetch the real-time stock price for the provided stock symbol.

Example response:
```json
{
  "symbol": "AAPL",
  "price": "150.00",
  "timestamp": "2024-10-10 15:00:00"
}
```

## Project Structure

```bash
stock-market-ticker-web/
├── backend/                 # Go backend folder
│   ├── main.go              # Main Go application file
│   └── ...                  # Other Go files
├── frontend/                # React frontend folder
│   ├── src/                 # React source code
│   └── ...                  # Other frontend files
├── README.md                # Project documentation
└── LICENSE                  # License file
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

DISCLAIMER: This software is provided for informational purposes only and does not constitute financial advice. The creator of this software is not a financial advisor, and in no way, shape, or form is this software intended to be used for financial decision-making. Always do your own research and consult with a professional before making any financial decisions.
