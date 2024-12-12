const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Hello World! Basic CSCI355 Project 2 endpoint!" });
});

module.exports = router;
