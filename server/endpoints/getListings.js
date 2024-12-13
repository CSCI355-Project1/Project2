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
  const userUid = req.headers.authorization;

  if (!userUid) {
    return res.status(401).json({
      error: "Authorization header is required",
    });
  }

  try {
    const query = `
      SELECT *
      FROM products
      WHERE created_by = $1
      ORDER BY created_at DESC
    `;

    const { rows } = await pool.query(query, [userUid]);

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching user products:", error);
    res.status(500).json({
      error: "An error occurred while fetching the user's products",
      details: error.message,
    });
  }
});

module.exports = router;
