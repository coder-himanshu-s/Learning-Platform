import express from "express";
import dotenv from "dotenv";
import connectDb from "./database/db.js";
import userRouter from "./routes/userRouter.js";
import courseRoute from "./routes/courseRouter.js";
import mediaRouter from "./routes/mediaRouter.js";
import progressRouter from "./routes/progressRouter.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
connectDb();

const app = express();
const PORT = process.env.PORT || 8080;

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

app.use("/", userRouter);
app.use("/", courseRoute);
app.use("/", mediaRouter);
app.use("/", progressRouter);

app.get("/", (req, res) => {
  res.send("this is home route");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
