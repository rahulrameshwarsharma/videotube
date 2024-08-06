import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user-model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";


const registerUser = asyncHandler ( async (req, res) => {

    // steps to register user pseudocode
    // 1. get user details from frontend
    // 2. validation of input received
    // 3. check if user already exits: check both email and username
    // 4. check for images, check for avatar
    // 5. upload images to cloudinary if the available
    //         a. check whether user uploaded avatar
    //         b. if user uploaded, whether multer uploaded it to cloudinary
    //         c. if uploaded to cloudinary, do we have url of cloudinary or not
    // 6. create user object - create entry in db
    // 7. remove password and refresh token field from response
    // 8. check for user creation if yes continue, if not created handle the error
    // 9. if user created return res

    const {fullName, email, userName, password} = req.body

    // console.log("fullName", fullName);
    console.log("email", email);
    // console.log("userName", userName);

        // How beginner programmers check validation

    // if (fullName === "") {
    //     throw new ApiError(400, "full name is requir")
    // }

        // How expert programmers checks validation
                            // ############# Code for Validation of User input #########
    if (
        [fullName, email, password, userName].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

                            // ############# Code for checking the already existing user #########
    const existedUser = await User.findOne({
        $or: [{userName}, {email}]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;

    // console.log("req.file", req.files);
    // console.log("req.files.coverImage", req.files.coverImage);

    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    
    if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }

//  taking this "User" inside a another variable "user" to reconfirm whether the user created or not

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",              // This is the corner cases
        email,
        password,
        userName: userName.toLowerCase(),
    });

    //  In below codes we are checking whether the user created or not, and if the user created then we have to
    // remove some fields from the user document like refresh token, password etc

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered Successfully")
    )
})

export {
    registerUser,
}