const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 4000;

app.use(cors());

app.get("/proxy", async (req, res) => {
    const { url } = req.query;
    if (!url) {
        return res.status(400).send("URL is required");
    }

    try {
        const response = await axios.get(url);
        res.send(response.data);
    } catch (error) {
        console.error("Error fetching URL:", error.message);
        res.status(500).send("Error fetching the URL");
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server running at http://localhost:${PORT}`);
});