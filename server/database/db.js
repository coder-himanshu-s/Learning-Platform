import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();
const connectDb = async ()=>{
    await mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("mongoose connection successful");
    }).catch((e)=>{
        console.log(e);
        console.log("Error in db connection ");
    });
}
export default connectDb;
