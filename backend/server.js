import  express  from 'express'
import mongoose from 'mongoose'
import dotenv from "dotenv";
import cors  from 'cors'
import connectDB from './config/db.js';

import authRoutes from './routes/authRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import orderRoutes from  './routes/orderRoutes.js'
import userProfileRoutes from './routes/userProfileRoutes.js'

dotenv.config();
const  app = express();

connectDB();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use('/api/auth', authRoutes);
app.use('/api',  productRoutes);
app.use('/api', cartRoutes);
app.use('/api', orderRoutes);
app.use('/api', userProfileRoutes)

app.get('/',(req, res)=>{
    res.send("Hello KishanBazar");
})

const  port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`The server is live on: http://localhost:${port}`);
});