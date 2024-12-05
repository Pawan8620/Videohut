import { ApiResponse } from "../utils/ApiResponse.js";
import { aysncHandler } from "../utils/asyncHandler.js";



const healthCheck = aysncHandler(
    async (req,res)=>{
        return res
        .status(200)
        .json(
            new ApiResponse(200,"Okay","Health check passed")
        )
    }
)

export {
    healthCheck
}