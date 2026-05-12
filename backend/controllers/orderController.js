import Order from '../models/Order.js'
import Cart from '../models/Cart.js'
import Product from '../models/Product.js'
import mongoose from 'mongoose'

export const addOrder = async (req, res)=>{
    const user = req.user.id;
    const {shippingAddress, orderItems, quantity, buyNow} = req.body;
    try{
        let finalItems = [];
        let  cart = null;
       if(buyNow){
        for(const item of orderItems){
            const productData = await Product.findById(item.product);
            finalItems.push({
            product: item.product,
            quantity: item.quantity,
            price: productData.price
            });
        }
        // orderItems = [{ product, price, quantity}]
       }
       else{
        cart = await Cart.findOne({user: user});
        if (!cart || cart.items.length === 0) {
            return res.json({
                success: false,
                message: "Cart is empty"
            });
        }
        for (const item of cart.items){
            const productData = await Product.findById(item.product);
            finalItems.push({
                product : item.product,
                quantity : item.quantity,
                price : productData.price
            })
        }
       }
       console.log("FINAL ITEMS:", finalItems);
       const totalPrice = finalItems.reduce((sum, item)=>{
        return sum + (item.price * item.quantity);
       }, 0);
       const order  = await Order.create({
        user: user,
        items: finalItems,
        totalPrice: totalPrice,
        shippingAddress: shippingAddress
        });
        if(!buyNow){
            cart.items = [];
            await cart.save();
        }
        res.json({
            success: true,
            message: "Order successfully Placesd",
            data: order
        });
    }
    catch(err){
            console.log("Error while adding order:", err.message);
            console.log(err);        res.json({
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