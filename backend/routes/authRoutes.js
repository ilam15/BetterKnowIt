const express = require("express");
const router = express.Router();
const { RegisterUser, login } = require("../controllers/authcontroller");

router.post("/register", RegisterUser)
router.post("/login", login)

module.exports = router
