import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const getCart = async (req, res) => {
    const id = req.user.id;
    try{
const cart = await Cart.findOne({ user: id })
  .populate("items.product", "name price image category stock unit location");
  
          if(!cart){
            return res.json({
                success: true,
                message: "No items in Cart",
                data: null
            });
        }
        res.json({
            success: true,
            message: "Items fetched Successfully",
            data: cart
        });
    }
    catch(err){
        console.log("Error fetching cart");
        res.json({
            success: false,
            message: "Error  while fetching cart",
            data: null
        });
    }
};
export const addCart = async (req, res) => {
    const  id = req.user.id;
    const {productId, quantity} = req.body;
    // product and  quantity
    try{
        const userCart = await Cart.findOne({user: id});
        if(!userCart){
            const newCart = await Cart.create({user: id, items:[{product: productId, quantity: quantity}]});
            return res.json({
                success: true,
                message: "Cart successfully added",
                data: newCart
            });
        }
        if(userCart){
            const search = userCart.items.find((i)=>{
                return i.product.toString() == productId.toString();
            })
            if(search){
                search.quantity += quantity;
            }
            else{
                userCart.items.push({product: productId, quantity: quantity});
            }
        }
        await userCart.save();
        res.json({
            success: true,
            message: "Cart successfully added",
            data: userCart
        });
    }
    catch(err){
        console.error("Error while adding to cart: ", err);
        res.json({
            success: false,
            message: "Adding to Cart failed"
        });
    }
};
export const updateCart = async (req, res) => {
    const productId = req.params.id;
    const user = req.user.id;
    const {quantity} = req.body;
    try{
        const userCart = await Cart.findOne({user: user});
        if(userCart){
            const search = userCart.items.find((i)=>{
                return productId.toString() == i.product.toString();
            });
            if(!search){
                return  res.json({
                    success: true,
                    message: "No such Product is found to update in cart.",
                    data: userCart
                })
            }
            if(quantity === 0){
                const newItems = userCart.items.filter((i)=>i.product.toString() !== productId.toString());
                userCart.items = newItems;
                await userCart.save();
                return res.json({
                    success: true,
                    message: "Item removed  from cart"
                });
            }
            search.quantity = quantity;
            await userCart.save();
            res.json({
                success: true,
                message: "Cart updated successfully",
                data: userCart
            });
        }
        else{
            return res.json({
                success: true,
                message: "No cart found"
            });
        }
    }
    catch(err){
        console.error("Error updating Cart: ", err);
        res.json({
            success: false,
            message: "Error  while updating Cart"
        });
    }
};
export const deleteCart = async (req, res) => {
    const productId = req.params.id;
    const user = req.user.id;
    try{
        const userCart = await Cart.findOne({user: user});
        if(userCart){
           const newItems = userCart.items.filter((i)=>i.product.toString() !== productId.toString());
            userCart.items = newItems;
            await userCart.save();
            return res.json({
                success: true,
                message: "Item removed  from cart"
            });
        }
        else{
            return res.json({
                success: true,
                message: "Cart not found"
            })
        }
    }
    catch(err){
        console.error("Error  while  removing  items from cart");
        res.json({
            success: false,
            message: "Error  while removing items from Cart"
        });
    }
};