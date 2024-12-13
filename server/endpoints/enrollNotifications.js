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
    const eventCheck = await pool.query("SELECT id FROM events WHERE id = $1", [
      eventId,
    ]);

    if (eventCheck.rows.length === 0) {
      return res.status(404).json({
        error: "Event not found",
      });
    }

    const subscriptionCheck = await pool.query(
      "SELECT id FROM notifications WHERE user_uid = $1 AND event_id = $2",
      [userUid, eventId]
    );

    if (subscriptionCheck.rows.length > 0) {
      return res.status(400).json({
        error: "User is already subscribed to this event",
      });
    }

    const query = `
      INSERT INTO notifications (
        user_uid,
        type,
        content,
        read,
        event_id,
        created_at,
        updated_at
      )
      VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      RETURNING *;
    `;
    let content_value = await pool.query(
      "SELECT title FROM events WHERE id = $1",
      [eventId]
    );
    content_value = content_value.rows[0].title;

    const values = [
      userUid,
      "event_subscription",
      content_value,
      false,
      eventId,
    ];

    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error subscribing to event:", error);
    res.status(500).json({
      error: "Internal server error while subscribing to event",
    });
  }
});

module.exports = router;
