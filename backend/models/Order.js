import mongoose from 'mongoose'
import Product from './Product.js'
import User  from './User.js'
const orderSchema = new mongoose.Schema(
    {
        user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
        items: [
            {
                product: {type: mongoose.Schema.Types.ObjectId, ref:'Product'},
                quantity: {type: Number, default: 1, min: 1},
                name: String,
                price: Number
            }
        ],
        totalPrice: {type: Number, required: true},
        shippingAddress: {type: String, required: true}
    }
)
const Order  = mongoose.model("Order", orderSchema);

export default Order;