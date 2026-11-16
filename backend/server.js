import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check / Root Route
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Job Portal Backend API is running successfully!",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    uptime: process.uptime(),
    dbConnected: mongoose.connection.readyState === 1,
  });
});

// Database Connection & Server Startup
const startServer = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (mongoUri) {
      await mongoose.connect(mongoUri);
      console.log("✅ Successfully connected to MongoDB.");
    } else {
      console.warn("⚠️  MONGO_URI is not defined in environment variables. Running server without database connection.");
    }

    app.listen(PORT, () => {
      console.log(`🚀 Server is listening on port ${PORT}`);
      console.log(`📡 URL: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
