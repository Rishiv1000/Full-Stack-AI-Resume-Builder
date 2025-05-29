import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import resumeRouter from "./routes/resume.routes.js";
import cors from "cors";
import { config } from "dotenv";
config();

const app = express();

// ✅ Middleware: JSON parsing, URL encoding, and cookie parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ CORS setup for Vercel + Localhost (with exact origins)
const corsOptions = {
  origin: ['https://full-stack-ai-resume-builder-adlc.vercel.app', 'http://localhost:5173'],
  credentials: true, // ✅ Allow cookies in cross-origin requests
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Optional: limit methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Optional: specify allowed headers
};

app.use(cors(corsOptions));

// ✅ Preflight support for all routes
app.options('*', cors(corsOptions));

// ✅ Routes
app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);

// ✅ Test route (optional)
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

export default app;
