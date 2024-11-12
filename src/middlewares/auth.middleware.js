import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { aysncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"

export const verifyJWT = aysncHandler(async(req,res,next)=>{
    try {
        const token = req.cookies?.accesToken || req.header("Authorization")?.replace("Bearer ","")
    
        if(!token){
            throw new ApiError(401,"Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id).select(
            "-password, -refreshToken"
        )
    
        if(!user){
            // TODO disscuss about frontend
            throw new ApiError(401,"Invalid Acces Token")
        }
    
        req.user = user
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Access Token")
    }
})