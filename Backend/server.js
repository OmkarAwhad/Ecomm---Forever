const express = require("express");
const app = express();
const cors = require("cors");
const connectCloudinary = require("./config/cloudinary");
require("dotenv").config();
const userRoutes = require("./routes/user.routes");
const productRoutes = require("./routes/product.routes");
const cartRoutes = require("./routes/cart.routes");
const orderRoutes = require("./routes/orders.routes");
const addressRoutes = require("./routes/address.routes");
const mailRoutes = require("./routes/mail.routes");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

// DB connection
require("./config/mongoose").connect();

connectCloudinary();
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/mail", mailRoutes);
app.use("/api/v1/address", addressRoutes);
app.use("/api/v1/order", orderRoutes);

app.get("/", (req, res) => {
	res.send("Hello");
});

app.listen(PORT, () => console.log("Server running at port : ", PORT));
