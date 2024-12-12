const express = require("express");
const router = express.Router();
require("dotenv").config();

const { Pool } = require("pg");
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

router.get("/", async (req, res) => {
  try {
    const sellerUid = req.headers["authorization"];

    if (!sellerUid) {
      return res.status(400).json({ error: "UID is required" });
    }

    const query = `
            SELECT * FROM transactions 
            WHERE buyer_uid = $1
        `;

    const { rows } = await pool.query(query, [sellerUid]);

    res.status(200).json(rows || []);
  } catch (error) {
    console.error("Error fetching seller transactions:", error);
    res.status(500).json({
      error: "An error occurred while fetching transactions",
      details: error.message,
    });
  }
});

module.exports = router;
