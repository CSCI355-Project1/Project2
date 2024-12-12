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

router.post("/:eventId", async (req, res) => {
  const eventId = parseInt(req.params.eventId);
  const userUid = req.headers.authorization;

  if (!userUid) {
    return res.status(401).json({
      error: "Authorization header is required",
    });
  }

  try {
    const notificationCheck = await pool.query(
      "SELECT id FROM notifications WHERE user_uid = $1 AND event_id = $2",
      [userUid, eventId]
    );

    if (notificationCheck.rows.length === 0) {
      return res.status(404).json({
        error: "No notification found for this user and event",
      });
    }

    const query = `
     UPDATE notifications
     SET read = true,
         updated_at = CURRENT_TIMESTAMP
     WHERE user_uid = $1 AND event_id = $2
     RETURNING *;
   `;

    const result = await pool.query(query, [userUid, eventId]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error dismissing notification:", error);
    res.status(500).json({
      error: "Internal server error while dismissing notification",
    });
  }
});

module.exports = router;
