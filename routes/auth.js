const express = require("express");
const { check, validationResult } = require("express-validator");

const router = express.Router();

const { login, register } = require("../controllers/auth");

router.post("/login", login);

router.post("/register", register);

module.exports = router;
