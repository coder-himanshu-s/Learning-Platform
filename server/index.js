import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";


const app = express();
const PORT = process.env.PORT || 8000;

app.listen(PORT,()=>{
    console.log(`server is listening on port no ${PORT}`);
});