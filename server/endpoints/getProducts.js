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
    const maxPrice = req.headers["max-price"];
    const minPrice = req.headers["min-price"];
    const status = req.headers["status"];

    let query = "SELECT * FROM products";
    const values = [];
    let conditions = [];

    if (maxPrice) {
      values.push(parseFloat(maxPrice));
      conditions.push(`price <= $${values.length}`);
    }

    if (minPrice) {
      values.push(parseFloat(minPrice));
      conditions.push(`price >= $${values.length}`);
    }

    if (status) {
      values.push(status);
      conditions.push(`status = $${values.length}`);
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    query += " ORDER BY id ASC";

    const { rows } = await pool.query(query, values);

    res.json(rows);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      error: "An error occurred while fetching products",
      details: error.message,
    });
  }
});

module.exports = router;
