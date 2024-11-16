import { v2 as cloudinary } from 'cloudinary';

const cloud = new cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_SECRET_KEY,
	upload_prefix: process.env.CLOUDINARY_UPLOAD_PREFIX,
});

/* cloudinary.config({ 
    cloud_name: 'my_cloud_name', 
    api_key: 'my_key', 
    api_secret: 'my_secret',
    secure_distribution: 'mydomain.com',
    upload_prefix: 'myprefix.com'
  }); */

//module.exports = cloudinary;
export default cloud;