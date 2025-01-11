const express = require('express');
const CryptoData = require('../models/CryptoData');
const { calculateDeviation } = require('../utils/calculateDeviation');

const router = express.Router();

// /stats endpoint
router.get('/stats', async (req, res) => {
    const { coin } = req.query;
    if (!coin) return res.status(400).json({ error: 'Coin is required' });

    const latestData = await CryptoData.findOne({ coin }).sort({ timestamp: -1 });
    if (!latestData) return res.status(404).json({ error: 'Data not found for the given coin' });

    res.json({
        price: latestData.price,
        marketCap: latestData.marketCap,
        change24h: latestData.change24h,
    });
});

// /deviation endpoint
router.get('/deviation', async (req, res) => {
    const { coin } = req.query;
    if (!coin) return res.status(400).json({ error: 'Coin is required' });

    const data = await CryptoData.find({ coin }).sort({ timestamp: -1 }).limit(100);
    if (data.length === 0) return res.status(404).json({ error: 'No data found for the given coin' });

    const prices = data.map(record => record.price);
    const deviation = calculateDeviation(prices);

    res.json({ deviation });
});

module.exports = router;
