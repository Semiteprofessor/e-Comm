const express = require("express");
const app = express();
const userRoute = require("./routes/user.route.js");
const authRoute = require("./routes/auth.route.js");
const productRoute = require("./routes/product.route.js");
const cartRoute = require("./routes/cart.route.js");
const orderRoute = require("./routes/order.route.js");
const cors = require("cors");

const connectDB = require("./config/db.config.js");

connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Endpoints
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/carts", cartRoute);
app.use("/api/v1/orders", orderRoute);

app.listen(process.env.PORT || 8899, () => {
  console.log("Backend server is running!");
});
