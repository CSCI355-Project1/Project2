const express = require("express");
const router = express.Router();
const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

router.post("/", async (req, res) => {
  const { title, description, date, location, created_by } = req.body;

  if (!title || !date || !location || !created_by) {
    return res.status(400).json({
      error: "Required fields: title, date, location, created_by",
    });
  }

  try {
    const query = `
      INSERT INTO events (
        title,
        description,
        date,
        location,
        created_by,
        created_at,
        updated_at
      )
      VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      RETURNING *;
    `;

    const values = [title, description || null, date, location, created_by];

    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({
      error: "Internal server error while creating event",
    });
  }
});

module.exports = router;
