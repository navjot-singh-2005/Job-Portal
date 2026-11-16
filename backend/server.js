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

// --- Job Schema & Model ---
const jobSchema = new mongoose.Schema(
  {
    roleName: { type: String, required: true },
    companyName: { type: String, required: true },
    companyLogo: { type: String, default: "" },
    techStack: { type: [String], default: [] },
    location: { type: String, default: "Remote" },
    experience: { type: String, default: "1-3 years" },
    salary: { type: Number, default: 60000 },
    salaryType: { type: String, default: "/month" },
    jobType: { type: String, default: "Full-Time" },
    postDate: { type: Date, default: Date.now },
    category: { type: String, default: "Software Development" },
    openings: { type: Number, default: 2 },
    overview: { type: String, default: "Exciting opportunity to work with modern technologies." },
    responsibilities: { type: [String], default: [] },
    jobCriteria: { type: [String], default: [] },
    education: { type: [String], default: [] },
    status: { type: String, enum: ["active", "closed"], default: "active" },
  },
  { timestamps: true }
);

const Job = mongoose.models.Job || mongoose.model("Job", jobSchema);

// Initial fallback mock data so frontend always receives data
const initialJobs = [
  {
    _id: "661f1c29a8f1e2b4c1000001",
    roleName: "Full Stack Developer",
    companyName: "Google",
    companyLogo: "https://www.google.com/favicon.ico",
    techStack: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    location: "Bangalore / Remote",
    experience: "2-4 years",
    salary: 120000,
    salaryType: "/month",
    jobType: "Full-Time",
    category: "Engineering",
    openings: 5,
    overview: "Build modern, scalable web applications connecting millions of users.",
    status: "active",
  },
  {
    _id: "661f1c29a8f1e2b4c1000002",
    roleName: "Backend Engineer",
    companyName: "Microsoft",
    companyLogo: "https://www.microsoft.com/favicon.ico",
    techStack: ["Node.js", "Express", "PostgreSQL", "Docker"],
    location: "Hyderabad / Hybrid",
    experience: "3+ years",
    salary: 110000,
    salaryType: "/month",
    jobType: "Full-Time",
    category: "Backend",
    openings: 3,
    overview: "Design and implement high-performance microservices and cloud infrastructure.",
    status: "active",
  },
  {
    _id: "661f1c29a8f1e2b4c1000003",
    roleName: "Frontend UI/UX Developer",
    companyName: "Amazon",
    companyLogo: "https://www.amazon.com/favicon.ico",
    techStack: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    location: "Delhi NCR / Remote",
    experience: "1-3 years",
    salary: 95000,
    salaryType: "/month",
    jobType: "Full-Time",
    category: "Design & Frontend",
    openings: 4,
    overview: "Craft elegant and accessible user interfaces for candidate and recruiter portals.",
    status: "active",
  },
];

// --- Routes ---

// Health Check
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Job Portal Backend API is running successfully!",
    database: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected (Running in Mock/Fallback Mode)",
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

// Jobs API: GET all jobs
app.get("/api/job", async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const dbJobs = await Job.find({ status: "active" }).sort({ createdAt: -1 });
      if (dbJobs.length > 0) {
        return res.status(200).json({ success: true, count: dbJobs.length, jobs: dbJobs });
      }
    }
    // Fallback to sample jobs if DB is empty or not yet connected
    res.status(200).json({ success: true, count: initialJobs.length, jobs: initialJobs });
  } catch (err) {
    res.status(200).json({ success: true, count: initialJobs.length, jobs: initialJobs });
  }
});

// Jobs API: GET single job by ID
app.get("/api/job/:id", async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const job = await Job.findById(req.params.id);
      if (job) return res.status(200).json({ success: true, job });
    }
    const fallbackJob = initialJobs.find((j) => j._id === req.params.id) || initialJobs[0];
    res.status(200).json({ success: true, job: fallbackJob });
  } catch (err) {
    res.status(200).json({ success: true, job: initialJobs[0] });
  }
});

// Interview Roles API
app.get("/api/interview/roles", (req, res) => {
  res.status(200).json({
    success: true,
    roles: [
      { _id: "1", roleName: "Software Engineer", questionsCount: 45 },
      { _id: "2", roleName: "Frontend Developer", questionsCount: 30 },
      { _id: "3", roleName: "Backend Developer", questionsCount: 40 },
      { _id: "4", roleName: "Full Stack Developer", questionsCount: 50 },
    ],
  });
});

// Interview Companies API
app.get("/api/interview/companies", (req, res) => {
  res.status(200).json({
    success: true,
    companies: [
      { _id: "1", companyName: "Google", questionsCount: 60, logo: "https://www.google.com/favicon.ico" },
      { _id: "2", companyName: "Amazon", questionsCount: 55, logo: "https://www.amazon.com/favicon.ico" },
      { _id: "3", companyName: "Microsoft", questionsCount: 50, logo: "https://www.microsoft.com/favicon.ico" },
    ],
  });
});

// User profile API
app.get("/api/user/profile", (req, res) => {
  res.status(200).json({
    success: true,
    user: {
      fullName: "Navjot Singh",
      email: "navjot1234an@gmail.com",
      role: "Candidate",
    },
  });
});

// Saved items API
app.get("/api/saved", (req, res) => {
  res.status(200).json({ success: true, savedJobs: [], savedQuestions: [] });
});

// Start Server
const startServer = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (mongoUri) {
      await mongoose.connect(mongoUri);
      console.log("✅ MongoDB Connected Successfully.");
    } else {
      console.warn("⚠️  MONGO_URI not set. Running with built-in mock database.");
    }
  } catch (error) {
    console.error("❌ MongoDB connection failed, running in fallback mode:", error.message);
  }

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();
