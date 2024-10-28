# backend/app.py

from flask import Flask, jsonify, request
import yfinance as yf
from flask_cors import CORS
from datetime import datetime

# Initialize the Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS

# Route to get the current stock price and additional data
@app.route('/api/stocks', methods=['GET'])
def get_stock_price():
    symbol = request.args.get('symbol', '').upper()

    if not symbol:
        return jsonify({"error": "Stock symbol not provided"}), 400

    try:
        # Fetch stock data using yfinance
        stock = yf.Ticker(symbol)
        stock_info = stock.history(period='1d')

        if stock_info.empty:
            return jsonify({"error": "Invalid or unknown stock symbol"}), 404

        # Extract relevant data
        current_price = stock_info['Close'].iloc[-1]
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        high_52week = stock.info.get('fiftyTwoWeekHigh', 'N/A')
        low_52week = stock.info.get('fiftyTwoWeekLow', 'N/A')
        market_cap = stock.info.get('marketCap', 'N/A')
        pe_ratio = stock.info.get('trailingPE', 'N/A')

        # Prepare the response data
        stock_data = {
            "symbol": symbol,
            "price": round(current_price, 2),
            "timestamp": timestamp,
            "high_52week": high_52week,
            "low_52week": low_52week,
            "market_cap": market_cap,
            "pe_ratio": pe_ratio
        }

        return jsonify(stock_data)

    except Exception as e:
        return jsonify({"error": f"Failed to fetch stock data: {str(e)}"}), 500

# Route to get historical stock data
@app.route('/api/stocks/historical', methods=['GET'])
def get_historical_data():
    symbol = request.args.get('symbol', '').upper()

    if not symbol:
        return jsonify({"error": "Stock symbol not provided"}), 400

    try:
        stock = yf.Ticker(symbol)
        historical_data = stock.history(period="1mo")  # Get one month of data

        if historical_data.empty:
            return jsonify({"error": "Invalid or unknown stock symbol"}), 404

        # Extract dates and closing prices
        historical_prices = [
            {"date": str(index.date()), "close": round(row['Close'], 2)}
            for index, row in historical_data.iterrows()
        ]

        return jsonify({"symbol": symbol, "prices": historical_prices})

    except Exception as e:
        return jsonify({"error": f"Failed to fetch historical data: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
