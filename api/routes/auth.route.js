const { register, login } = require("../cores/auth.core");

const router = require("express").Router();

// CREATE USER ROUTE
router.post("/register", register);

// UPDATE PRODUCT ROUTE
router.post("/login", login);

module.exports = router;
