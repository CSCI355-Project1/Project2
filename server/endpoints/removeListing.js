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

router.delete("/:id", async (req, res) => {
  const productId = parseInt(req.params.id);
  const userUid = req.headers.authorization;

  if (!userUid) {
    return res.status(401).json({
      error: "Authorization header is required",
    });
  }

  try {
    const checkQuery = `
      SELECT id FROM products 
      WHERE id = $1 AND created_by = $2
    `;
    const checkResult = await pool.query(checkQuery, [productId, userUid]);

    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        error: "Product not found or you don't have permission to delete it",
      });
    }

    const deleteQuery = `
      DELETE FROM products 
      WHERE id = $1 AND created_by = $2 
      RETURNING *
    `;

    const { rows } = await pool.query(deleteQuery, [productId, userUid]);
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({
      error: "An error occurred while deleting the product",
      details: error.message,
    });
  }
});

module.exports = router;
