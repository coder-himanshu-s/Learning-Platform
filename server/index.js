import express from "express";
import dotenv from "dotenv";
import connectDb from "./database/db.js";
import userRouter from "./routes/userRouter.js";
import courseRoute from "./routes/courseRouter.js";
import mediaRouter from "./routes/mediaRouter.js"
import progressRouter from "./routes/progressRouter.js"
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
connectDb();
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific HTTP methods
    credentials: true, // Allow cookies and credentials if needed
  })
); 

app.use("/", userRouter);
app.use("/", courseRoute);
app.use("/", mediaRouter);
app.use("/", progressRouter);
app.get("/", (req, res) => {
  res.send("this is home route");
});

app.listen(PORT, () => {
  console.log(`server is listening on port no ${PORT}`);
});
