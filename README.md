# Stock Market Ticker (Web App)

## Project Overview

This project is a full-stack web application that displays stock market data, including current prices, 52-week highs/lows, and historical charts, using React for the frontend and Python (Flask) for the backend. Stock data is sourced from Yahoo Finance via the yfinance library, and the frontend and backend are hosted separately on Vercel.

## Tech Stack

- Frontend: React, hosted on Vercel
- Backend: Python (Flask), hosted on Vercel
- API for Stock Data: Yahoo Finance via yfinance

## Features

- **Search Stock Symbol**: Enter a symbol (e.g., AAPL) to view the latest stock data.
- **Real-time Stock Information**: Displays the current price, 52-week high/low, market cap, and P/E ratio.
- **Historical Chart**: Provides a one-month historical price chart.
- **Error Handling**: Displays user-friendly error messages for invalid stock symbols or API errors.

## Deployment and Hosting

Both the frontend and backend are hosted on Vercel, ensuring separate and scalable hosting solutions:

- **Frontend URL**: [http://stock-market-ticker-frontend.vercel.app/](http://stock-market-ticker-frontend.vercel.app/)
- **Backend URL**: [http://stock-market-ticker-ten.vercel.app/](http://stock-market-ticker-ten.vercel.app/)
- **CORS** is configured to allow secure communication between the hosted frontend and backend.

## Project Structure

```
stock-market-ticker/
├── backend/                 # Flask backend folder
|   ├── vercel.json              # Configuration for Vercel deployment
│   ├── app.py               # Flask application file
│   └── requirements.txt     # Backend dependencies
├── frontend/                # React frontend folder
│   ├── src/                 # React source code
│   └── public/              # Public assets
└── README.md                # Project documentation
```

## How to Run Locally

### Prerequisites

- Python and pip for backend
- Node.js and npm for frontend

### Backend (Flask) Setup

Navigate to the backend folder:

```
cd backend
```

Install dependencies:

```
pip install -r requirements.txt
```

Run the Flask server:

```
flask run
```

### Frontend (React) Setup

Navigate to the frontend folder:

```
cd frontend
```

Install dependencies and run the development server:

```
npm install
npm start
```

Open the app at:

```
http://localhost:3000
```

## Contributors

```
- Ethan Diaz - [GitHub Profile](https://github.com/ethandCS)
- Cyril Youssef - [GitHub Profile](https://github.com/cyrilyoussef)
```

## License

```
Licensed under the MIT License. See the LICENSE file for details.
```

