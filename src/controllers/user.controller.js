import { aysncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"

const generateAccesAndRefereshTokens = async(userId) =>
    {
    try {
        const user = await User.findById(userId)
        const accesToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accesToken, refreshToken}
         
    } catch (error) {
        throw new ApiError(500,"Something went wrong while generating refresh and acces token")
    }
}

const registerUser = aysncHandler( async (req,res) => {
    //Steps fro registration:-
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username,email
    // check for inamges, check for avatar
    // upload then to cloudinary, avatar
    // create user object - create entry in db
    // renove password and refresh token field from response
    // check for user creation
    // retur res

    const {fullName,email,username,password} = req.body
    // console.log("email:",email)

    // if(fullName === ""){
    //     throw new ApiError(400,"Fullname is required")
    // }

    if(
        [fullName, email, username, password].some((field)=>field?.trim() === "")
    ){
        throw new ApiError(400,"All Fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{username}, {email}]
    })

    if(existedUser){
        throw new ApiError(409, "User with email or username already exists")
    }

    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const coverImageLocalPath= req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)

    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400,"Avatar file iss required")
    }

    const user = await User.create({
        fullName,
        avatar:avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )

    res.status(200).json({
        message:"ok"
    })
} )

//for login

const loginUser = aysncHandler(async (req,res)=>{
    //req body -> data
    // username or email (what you are using for loging)
    // find the user
    // password check
    // acces and refresh token 
    // send the token i.e cookie

    const {email,username,password} = req.body

    if (!(username || email)) {
        throw new ApiError(400,"username or email is required")
    } 

    const user = await User.findOne({
        $or: [{username},{email}]
    })

    if(!user){
        throw new ApiError(404,"User doest not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid){
        console.log(password)
        throw new ApiError(401,"Invald user credentials")
    }

    const {accesToken,refreshToken} = await generateAccesAndRefereshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accesToken",accesToken, options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser,accesToken,refreshToken
            },
            "User logged In successfully"
        )
    )

})

const logoutUser = aysncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new:true
        }
    )

    const options = {
        httpOnly:true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("acccesToken",options)
    .clearCookie("refreshToken",options)
    .json(
        new ApiResponse(200,{},"User logged Out")
    )
})

const refreshAccessToken = aysncHandler(async (req,res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if(!incomingRefreshToken){
        throw new ApiError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const user = await User.findById(decodedToken?._id)
    
        if(!user){
            throw new ApiError(401,"Invalid RefreshToken")
        }
    
        if(incomingRefreshToken !== user?.refreshToken){
            throw new ApiError(401, "Refresh Token is expired or used")
        }
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const {accessToken, newrefreshToken} = await generateAccesAndRefereshTokens(user._id)
    
        return res
        .status(200)
        .cookie("acccesToken", acccesToken ,options)
        .cookie("refreshToken", newrefreshToken, options)
        .json(
            new ApiResponse(
                200,
                {acccesToken, refreshToken: newrefreshToken},
                "Access Token Refresh successfully"
            )
        )   
    } catch (error) {
        throw new ApiError(401,error?.message || Invalid RefreshTokenn)
    }
})

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken
}
