import mongoose from "mongoose";
import { orderStatusMess } from '../variables.js' 

const orderSchema = new mongoose.Schema({
    userId:{type:String},
    items:{type:Array,required:true},
    amount:{type:Number,required:true},
    address:{type:Object,required:true},
    status:{type:String,default:orderStatusMess},
    date:{type:Date,default:Date.now()},
    payment:{type:Boolean,default:false},
    verified:{type:Boolean,default:false},
    anonimToken:{type:String},
    verificationCode:{type:String},
    verificationCodeExpiresAt:{type:Date},
    rabat:{type:String}
})

const orderModel = mongoose.models.order || mongoose.model('order',orderSchema);

export default orderModel;