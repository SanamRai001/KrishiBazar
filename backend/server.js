import  express  from 'express'
import mongoose from 'mongoose'
import dotenv from "dotenv";

import connectDB from './config/db.js';

import authRoutes from './routes/authRoutes.js'

dotenv.config();
const  app = express();

connectDB();

app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/',(req, res)=>{
    res.send("Hello KishanBazar");
})

const  port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`The server is live on: http://localhost:${port}`);
});