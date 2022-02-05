const express = require("express");
let router = express.Router();

router.get("/", function (req, res) {
  res.send({ programa: "Auth Basic Google/Facebook/LinkedIn OAuth2" });
});

router.get("/profile", function (req, res) {
  res.send({ programa: "Profile" });
});

module.exports = router;
