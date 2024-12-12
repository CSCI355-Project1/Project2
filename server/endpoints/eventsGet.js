// Import required modules
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

router.get("/", async (req, res) => {
  try {
    const query = `
        SELECT 
          events.id,
          events.title,
          events.description,
          events.date,
          events.location,
          events.created_by,
          events.created_at,
          events.updated_at
        FROM events
        LEFT JOIN users ON events.created_by = users.id::varchar
        ORDER BY events.date ASC;
      `;

    const result = await pool.query(query);

    const formattedEvents = result.rows.map((event) => ({
      ...event,
      date: new Date(event.date).toISOString(),
      created_at: new Date(event.created_at).toISOString(),
      updated_at: new Date(event.updated_at).toISOString(),
    }));

    res.status(200).json(formattedEvents);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({
      error: "Internal server error while fetching events",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
        SELECT 
          events.id,
          events.title,
          events.description,
          events.date,
          events.location,
          events.created_by,
          events.created_at,
          events.updated_at
        FROM events
        LEFT JOIN users ON events.created_by = users.id::varchar
        WHERE events.id = $1;
      `;

    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Event not found",
      });
    }

    const event = {
      ...result.rows[0],
      date: new Date(result.rows[0].date).toISOString(),
      created_at: new Date(result.rows[0].created_at).toISOString(),
      updated_at: new Date(result.rows[0].updated_at).toISOString(),
    };

    res.status(200).json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({
      error: "Internal server error while fetching event",
    });
  }
});

module.exports = router;
