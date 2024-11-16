import { error } from "console";
import itemsModel from "../models/itemsModel.js";
import fs from 'fs';
import { succesMessage, errorMessage, removedMessage } from '../variables.js'

/* import cloud from '../utils/cloudinary.js' */


/* import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:  process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY
});
 */

/* const uploadImage = async (filePath) => {
    try {
      const result = await cloud.uploader.upload(filePath, {
        transformation: [
          { width: 800, height: 600, crop: "limit" },
          { fetch_format: "auto", quality: "auto" }
        ]
      });
      console.log('Upload successful:', result);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
   */



//add food item

const addItems = async (req,res) => {

    let image_filename = req.file ? `${req.file.filename}` : 'default.png';
/*     console.log(req.file.path)

console.log(uploadImage(req.file.path)) */
/*     const cloudData = new FormData();
    cloudData.append('file',req.file);
    cloudData.append('upload_preset',process.env.CLOUDINARY_CLOUD_NAME);
    cloudData.append('cloud_name', process.env.CLOUDINARY_API_KEY,);   

    const ress = await fetch(process.env.CLOUDINARY_URL_KEY,{
      method: 'POST',
      body: cloudData
    })

    console.log(ress)

    const uploadedImageURL = await ress.json()  */

    const items = new itemsModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename,
        img:req.body.img
    })
    try{
        await items.save()
        res.json({success:true,message: succesMessage})
    } catch(error){
        res.json({success:false,message: errorMessage})       
    }
}

// all items list
const itemsList = async (req,res) => {
    try {
        const items = await itemsModel.find({});
        res.json({success:true,data:items})
    } catch (error){
        res.json({success:false,message: errorMessage})
    }
}

// all items cat
const itemsCat = async (req,res) => {
    try {
        const items = await itemsModel.find({});
        let catArr = [];
        Object.entries(items).map(([item, i]) => {
            if(!(i['category']=='undefined')&&!catArr.includes(i['category'])){
                catArr.push(i['category'])
            }})

        res.json({success:true,data:catArr})
    } catch (error){
        res.json({success:false,message: errorMessage})
    }
}

//remove item
const removeItem = async (req,res) => {
    try {
        const item = await itemsModel.findById(req.body.id);
        if(item.image!=='default.png'){
            fs.unlink(`uploads/${item.image}`,()=>{})
        }

        await itemsModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message: removedMessage})
    } catch {
        res.json({success:false,message: errorMessage})
    }
}

const updateItem = async (req,res) => {
    //let image_filename = req.file ? req.file.filename : 'default.png';
    try {
        await itemsModel.findByIdAndUpdate(req.body.id,{
            name:req.body.name,
            description:req.body.description,
            price:req.body.price,
            category:req.body.category,

        });
        if(req.file){
            await itemsModel.findByIdAndUpdate(req.body.id,{
                image:req.file.filename,
                img:req.body.img
            });
        }
        res.json({success:true,message:'item updated'})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:'error'})
    }
}


export {addItems,itemsList,removeItem,updateItem,itemsCat}