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
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);

app.listen(process.env.PORT || 8899, () => {
  console.log("Backend server is running!");
});
