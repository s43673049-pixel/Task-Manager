const express = require('express');
const cors = require('cors');
require("dotenv").config();

const connectDB = require("./config/db");
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.CLIENT_URL ||  "http://localhost:5173"}));
app.use(express.json());

app.use("/api/auth", require("./routers/authRoutes"));
app.use("/api/todo", require("./routers/authRoutes"));

app.get("/", (req, res) => {
   res.json({
    message: "TaskFlow Api is running"
   });
});

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();

   app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} catch (err) {
  console.err("Server startup failed:", err.message);
  process.exit(1);
}
};

startServer();