const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = 8080;

app.use(express.static("public"));

app.get("/rates", async (req, res) => {
  const base = req.query.base || "USD";
  try {
    const response = await axios.get(`https://api.exchangerate.host/latest?base=${base}`);
    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch exchange rates." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
