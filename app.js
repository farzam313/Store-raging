const express = require("express");
const cors = require("cors");
const userRoutes = require("./src/routes/user.routes.js");
const reviewRoutes = require("./src/routes/review.routes.js");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API is Running... 🚀" });
});

app.use("/users", userRoutes);
app.use("/reviews", reviewRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 The Server is Running on localhost:${PORT}`);
});
