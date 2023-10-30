// Import required modules
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());

// Function to simulate a delay
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


// Route to fetch data from Trading Economics
app.get('/api/data', async (req, res) => {
    const api_key = "a051a375894a475:66a6hxg2w9f154s"

    let mexicoData, swedenData;

    try {
        const responseMexico = await axios.get(`https://api.tradingeconomics.com/historical/country/Mexico/indicator/Interest%20Rate/2016-12-01/2023-01-01?c=${api_key}`);
        mexicoData = responseMexico.data;
    } catch (error) {
        console.error("Error fetching data for Mexico:", error.message);
        return res.status(500).json({ error: "Failed to fetch data for Mexico." });
    }

    // Introduce a delay of 1.1 seconds to simulate a slow API
    await sleep(1100);

    try {
        const responseSweden = await axios.get(`https://api.tradingeconomics.com/historical/country/Sweden/indicator/Interest%20Rate/2016-12-01/2023-01-01?c=${api_key}`);
        swedenData = responseSweden.data;
    } catch (error) {
        console.error("Error fetching data for Sweden:", error.message);
        return res.status(500).json({ error: "Failed to fetch data for Sweden." });
    }

    res.json({
        mexico: mexicoData,
        sweden: swedenData
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});