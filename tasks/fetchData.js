const axios = require('axios');
const CryptoData = require('../models/CryptoData');
require('dotenv').config();
const apiKey = process.env.COINGECKO_API_KEY;
const url = process.env.COINGECKO_API_URL;
const COINS = ['bitcoin', 'matic-network', 'ethereum'];

const fetchCryptoData = async () => {
    try {
        const { data } = await axios.get(url, {
            params: {
            ids: COINS.join(','),
            vs_currencies: 'usd',
            include_market_cap: true,
            include_24hr_change: true,
            },
            headers: {accept: 'application/json', 'x-cg-demo-api-key': apiKey}
        });

        for (const coin of COINS) {
            const record = new CryptoData({
                coin,
                price: data[coin].usd,
                marketCap: data[coin].usd_market_cap,
                change24h: data[coin].usd_24h_change,
            });
            await record.save();
        }

        console.log('Crypto data fetched and stored.');
    } catch (err) {
        console.error('Error fetching crypto data:', err.message);
    }
};

const scheduleFetchData = () => {
    fetchCryptoData(); // Run immediately
    setInterval(fetchCryptoData, 2 * 60 * 60 * 1000); // Run every 2 hours
};

module.exports = { scheduleFetchData };
