import express from "express";
import dotenv from "dotenv";
import connectDb from "./database/db.js";
import userRouter from "./routes/userRouter.js";
import courseRoute from "./routes/courseRouter.js";
import mediaRouter from "./routes/mediaRouter.js";
import progressRouter from "./routes/progressRouter.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
connectDb();

const app = express();
const PORT = process.env.PORT || 8080;

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const allowedOrigins = [
  "http://localhost:5173", 
  "https://learning-platform-2.onrender.com",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API Routes
app.use("/api", userRouter);
app.use("/api", courseRoute);
app.use("/api", mediaRouter);
app.use("/api", progressRouter);

// Serve Static Frontend Files (React Build)
const CLIENT_BUILD_PATH = path.join(__dirname, "../client/dist");
app.use(express.static(CLIENT_BUILD_PATH));

app.get("/api", (req, res) => {
  res.send("this is home route");
});

// Handle React Routes (Fix for Reloading Issue)
app.get("*", (req, res) => {
  res.sendFile(path.join(CLIENT_BUILD_PATH, "index.html"));
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
