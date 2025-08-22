const express = require("express");
const { newsLetterBox } = require("../controllers/mail.controller");
const { auth, isUser } = require("../middlewares/auth");
const router = express.Router();

router.post("/newsLetterBox", auth, isUser, newsLetterBox);

module.exports = router;
