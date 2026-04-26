import mongoose  from 'mongoose'
import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv  from 'dotenv'
import { generateToken } from '../utils/generateToken.js'

dotenv.config();

export const register = async (req, res)=>{
    const {name, email, password, role} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try{
        const newUser = await User.create({
            name,
            email,
            password : hashedPassword,
            role
        });
        const token = generateToken(newUser._id);
        const userObj = newUser.toObject();
        delete userObj.password;
        res.json({
            success: true,
            message: "User Register Successfully",
            data: userObj,
            token: token
        })
    }
    catch(err){
        console.error("User  Registration Failed: ", err);
        res.json({
            success: false,
            message: "User Registration Failed",
            data: null
        });
    }
}

export const login = async (req,  res) =>{
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.json({
                success: false,
                message: "No User Found",
                data: null
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.json({
                success: false,
                message: "Invalid Credentails",
                data: null
            });
        }
        const token = generateToken(user._id);
        const userObj = user.toObject();
        delete userObj.password;
        res.json({
            success: true,
            message: "User LogIn successfull",
            data: userObj,
            token: token
        })
    }
    catch(err){
        console.error("Login Failed: ", err);
        res.json({
            success: false,
            message: "Login Failed",
            data: null
        });
    }
}