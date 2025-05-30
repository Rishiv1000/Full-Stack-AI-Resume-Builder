import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import resumeRouter from "./routes/resume.routes.js";
import cors from "cors";
import { config } from "dotenv";
config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Allow all origins dynamically
const corsOptions = {
  origin: function (origin, callback) {
    callback(null, origin || '*');  // Reflect the origin back (for any origin)
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Pre-flight requests

// Routes
app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);

export default app;



// const corsOptions = {
//     origin: [process.env.ALLOWED_SITE],
//     credentials: true
// };
