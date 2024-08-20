import { v2 as v2cloudinary } from "cloudinary";
import { response } from "express";
import { User } from "../models/user-model.js";

import fs from "fs";

v2cloudinary.config({
    cloud_name: process.env.ClOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async (localFilePath) => {
    // ----------- for deleting the old image------------------
    // const userImg = User.findById(req.user?._id);
    // if(!userImg) {
    //     throw new ApiError ("User not exit")
    // }

    // const oldCoverImageUrl = userImg.coverImage;
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        const uploadOnCloudinaryResponse = await v2cloudinary.uploader.upload(localFilePath, {resource_type: "auto"})

        //if file uploaded successfully to cloudinary
        // console.log("file is uploaded on cloudinary", uploadOnCloudinaryResponse.url);
        fs.unlinkSync(localFilePath);

        if (!uploadOnCloudinaryResponse) {
            throw new ApiError("Cover Image not updated due to unknown reason");
        }
         // ----------- for deleting the old image------------------
        // v2cloudinary.uploader.destroy(oldCoverImageUrl);

        
        return uploadOnCloudinaryResponse; //for users to know the upload status
    }catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}

export {uploadOnCloudinary}