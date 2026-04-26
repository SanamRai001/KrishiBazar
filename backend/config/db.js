import mongoose from 'mongoose'
import dotenv from "dotenv";
dotenv.config();
const  connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB in  on!");
    }
    catch(e){
        console.error("Mongo DB connection error!", e);
    }
}
export default connectDB;