const { register, login } = require("../cores/auth.core");

const router = require("express").Router();

// CREATE USER ROUTE
router.post("/create", register);

// UPDATE PRODUCT ROUTE
router.post("/login", login);

module.exports = router;
