import { v2 as v2cloudinary } from "cloudinary";
import { response } from "express";

import fs from "fs";

v2cloudinary.config({
    cloud_name: process.env.ClOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        const uploadOnCloudinaryResponse = await v2cloudinary.uploader.upload(localFilePath, {resource_type: "auto"})

        //if file uploaded successfully to cloudinary
        // console.log("file is uploaded on cloudinary", uploadOnCloudinaryResponse.url);
        fs.unlinkSync(localFilePath)
        return uploadOnCloudinaryResponse; //for users to know the upload status
    }catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}

export {uploadOnCloudinary}