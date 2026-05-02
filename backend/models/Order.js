import mongoose from 'mongoose'
import Product from './Product'

const orderSchema = new mongoose.Schema(
    {
        user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
        items: [
            {
                product: {type: mongoose.Schema.Types.ObjectId, ref:'Product'},
                quantity: {type: Number, default: 1, min: 1}
            }
        ],
        totalPrice: {type: Number, required: true},
        status: {type: String, required: true},
        address: {type: String, required: true}
    }
)