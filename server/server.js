const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const dotenv = require("dotenv");
const cors = require('cors')

dotenv.config();

const app = express();

const corsOptions = {
  origin: "http://localhost:3000" || process.env.CLIENT_URL,
  credentials: true,
};

// Use CORS middleware
app.use(cors(corsOptions));
// Middleware
app.use(express.json());
app.use(cookieParser());

connectDB();

// Routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
