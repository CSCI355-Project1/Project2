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

router.post("/", async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      image,
      createdBy,
      status,
      createdAt,
      updatedAt,
    } = req.body;

    const query = `
      INSERT INTO products (
        title, 
        description, 
        price, 
        image, 
        created_by,
        status, 
        created_at,
        updated_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;
    const values = [
      title,
      description,
      price,
      image,
      createdBy,
      status,
      createdAt,
      updatedAt,
    ];
    const { rows } = await pool.query(query, values);

    res.status(201).json(rows[0]);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      error: "An error occurred while creating the product",
      details: error.message,
    });
  }
});

module.exports = router;
