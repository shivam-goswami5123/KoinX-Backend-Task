# KoinX-Backend-Task

## **Introduction**
This project is a cryptocurrency tracker that periodically fetches and stores the latest pricing information, market capitalization, and 24-hour price changes for three popular cryptocurrencies: Bitcoin, Ethereum, and Polygon (Matic). The tracker is built using Node.js, Express, and MongoDB to provide efficient background data collection and real-time API endpoints. 


> **Important:** For complete information about the assignment, please refer to [this link](https://koinx.notion.site/KoinX-Backend-Internship-Assignment-119da378a24380e79505e883cd798e1d).

## **File Structure**

```
KoinX-Backend-Task/
│
├── app.js             # Main application entry point
├── models/
│   └── CryptoData.js  # Mongoose model for storing cryptocurrency data
├── routes/
│   └── api.js         # API routes
├── tasks/
│   └── fetchData.js   # Background job to fetch data from CoinGecko
├── utils/
│   └── calculateDeviation.js  # Utility to calculate standard deviation
├── config/
│   └── db.js          # MongoDB connection setup
├── package.json       # Project dependencies and scripts
└── README.md          # Instructions to run the project
```


## **Live API Base URL**

The API is deployed and available at the following base URL:

**`http://demo-ip-address/api`**

----------

## API Endpoints

### 1. **GET /stats**

Fetch the latest price, market capitalization, and 24-hour price change for a specific cryptocurrency.

#### **Endpoint:**

```bash
`GET /stats` 
```

#### **Query Parameters:**

| Parameter | Type   | Required | Description                                                                 |
|-----------|--------|----------|-----------------------------------------------------------------------------|
| `coin`    | string | Yes      | The ID of the cryptocurrency. Must be one of `bitcoin`, `ethereum`, or `matic-network`. |

#### **Example Request:**

```bash
`GET http://demo-ip-address/api/stats?coin=bitcoin` 
```

#### **Sample Response:**

```json

`{
  "price": 40000,
  "marketCap": 800000000,
  "24hChange": 3.4
}` 
```

#### **Explanation:**

-   The `/stats` endpoint retrieves the latest data stored in the database for the requested cryptocurrency.
-   The data includes:
    -   **Price**: The current price of the cryptocurrency in USD.
    -   **MarketCap**: The current market capitalization in USD.
    -   **24hChange**: The percentage change in the price over the last 24 hours.

----------

### 2. **GET /deviation**

Calculate the standard deviation of the price for the last 100 records stored for a specific cryptocurrency.

#### **Endpoint:**

```bash
`GET /deviation` 
```

#### **Query Parameters:**

| Parameter | Type   | Required | Description                                                                 |
|-----------|--------|----------|-----------------------------------------------------------------------------|
| `coin`    | string | Yes      | The ID of the cryptocurrency. Must be one of `bitcoin`, `ethereum`, or `matic-network`. |

#### **Example Request:**

```bash
`GET http://demo-ip-address/api/deviation?coin=bitcoin` 
```

#### **Sample Response:**

```json

`{
  "deviation": 4082.48
}` 
```

#### **Explanation:**

-   The `/deviation` endpoint calculates and returns the **standard deviation** of the prices of the requested cryptocurrency for the last 100 records.
-   **Standard Deviation**:
    -   A measure of how much the prices vary from the average price.
    -   High deviation indicates more volatility, while low deviation indicates stability.
