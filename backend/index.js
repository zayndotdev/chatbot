const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const chatRouter = require("./routes/chatRoute");

require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend URL
    credentials: true, // allow cookies/auth headers
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/chatbot")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Routes
app.use("/api/chat", chatRouter);

// Start server
app.listen(process.env.PORT || 4000, () => {
  console.log("Server running on port " + (process.env.PORT || 4000));
});
