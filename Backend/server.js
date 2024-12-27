const express = require("express");
const app = express();
const cors = require("cors");
const connectCloudinary = require("./config/cloudinary");
require("dotenv").config();
const userRoutes = require("./routes/user.routes");
const productRoutes = require("./routes/product.routes");
const cartRoutes = require("./routes/cart.routes");
const orderRoutes = require("./routes/orders.routes");

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

// DB connection
require("./config/mongoose").connect();

connectCloudinary();
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/order", orderRoutes);

app.get("/", (req, res) => {
	res.send("Hello");
});

app.listen(PORT, () => console.log("Server running at port : ", PORT));
