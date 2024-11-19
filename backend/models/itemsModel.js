import mongoose from "mongoose";

const itemsSchema = new mongoose.Schema({
    name: {type:String,required:true},
    description: {type:String,required:true},
    price: {type:Number,required:true},
    category: {type:String,required:true},
    image: {type:String,required:true},
    img: {type:String},
})

const itemsModel = mongoose.models.items || mongoose.model('items',itemsSchema)

export default itemsModel; 