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
  const userUid = req.headers.authorization;

  if (!userUid) {
    return res.status(401).json({
      error: "Authorization header is required",
    });
  }

  try {
    const query = `
     SELECT notifications.*, events.title as event_title, events.date as event_date
     FROM notifications
     JOIN events ON notifications.event_id = events.id
     WHERE notifications.user_uid = $1 
     AND notifications.read = false
     ORDER BY notifications.created_at DESC;
   `;

    const result = await pool.query(query, [userUid]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({
      error: "Internal server error while fetching notifications",
    });
  }
});

module.exports = router;
