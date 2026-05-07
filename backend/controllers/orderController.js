import Order from '../models/Order.js'
import Cart from '../models/Cart.js'
import Product from '../models/Product.js'
import mongoose from 'mongoose'

export const addOrder = async (req, res)=>{
    const user = req.user.id;
    const {shippingAddress, orderItems, quantity, buyNow} = req.body;
    try{
        let finalItems = [];
       if(buyNow){
        finalItems = orderItems;
        // orderItems = [{ product, price, quantity}]
       }
       else{
        const  cart = await Cart.findOne({user: user});
        for (const item of cart.items){
            const productData = await Product.findById(item.product);
            finalItems.push({
                product : item.product,
                quantity : item.quantity,
                price : productData.price
            })
        }
       }
       const totalPrice = finalItems.reduce((sum, item)=>{
        return sum = sum + (item.price * item.quantity);
       }, 0);
       const order  = await Order.create({
        user: user,
        items: finalItems,
        totalPrice: totalPrice,
        shippingAddress: shippingAddress
        });
        if(!buyNow){
            const cart = await Cart.findOne({user: user});
            cart.items = [];
            await cart.save();
        }
        res.json({
            success: true,
            message: "Order successfully Placesd",
            data: order
        })
    }
    catch(err){
        console.log("Error while  adding order");
        res.json({
            success : false,
            message : "Order adding failed"
        });
    }
}
export const deleteOrder = async (req, res)=>{
    const orderId = req.params.id;
    try{
        const order = await Order.findOneAndDelete({_id: orderId, user: req.user.id});
        if(!order){
            return res.json({
                success: true,
                message: "No  Such order  Found"
            });
        }
        res.json({
            success: true,
            message: "Orders deleted  successfully",
        });
    }
    catch(err){
        console.error("Error while deleting Order: ", err);
        res.json({
            success: false,
            message: "Error while deleting Orders"
        });
    }
}
export const getOrder = async (req, res)=>{
    const  user = req.user.id;
    try{
        const orders = await Order.find({user: user});
        if(orders.length === 0){
            return res.json({
                success: true,
                message: "No Orders  found  for user",
                data: []
            });
        }
        res.json({
            success: true,
            message: "Orders fetched  successfully",
            data: orders
        });
    }
    catch(err){
        console.error("Error while getting Order: ", err);
        res.json({
            success: false,
            message: "Error while getting Orders"
        });
    }
}