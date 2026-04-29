import Cart from "../models/Cart.js";

export const getCart = async (req, res) => {
    const id = req.user.id;
    try{
        const cart = await Cart.findOne({user: id});
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
export const updateCart = async (req, res) => {};
export const deleteCart = async (req, res) => {};