import dotenv from 'dotenv'
import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'


dotenv.config({
    path: './.env'
})

    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET ,
        secure: true, 
    });
    
    

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        //file has been uploaded successfull
        //console.log("file is uploaded on cloudinary",response.url);
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        console.error("Cloudinary upload error:", error);
        fs.unlinkSync(localFilePath) // remove the locally saved temporaray file as the upload opeartion got failed
        return null;
    }
}

const deleteOnCloudinary = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    } catch (error) {
        console.error('Error deleting image from Cloudinary:', error);
        throw new Error('Failed to delete image from Cloudinary');
    }
};

export {uploadOnCloudinary,deleteOnCloudinary}



//tahe reference from here for writing above code

//  // Upload an image
//  const uploadResult = await cloudinary.uploader
//  .upload(
//      'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
//          public_id: 'shoes',
//      }
//  )
//  .catch((error) => {
//      console.log(error);
//  });

// console.log(uploadResult);
       
