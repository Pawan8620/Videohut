
import { Router } from "express";
import { 
    createTweet, 
    deleteTweet, 
    getUserTweets, 
    updateTweet 
} from "../controllers/tweet.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = Router()


router.route("/create-tweet").post(verifyJWT,createTweet)

router.route("/update-tweet/:tweetId").post(verifyJWT,updateTweet)

router.route("/delete-tweet/:tweetId").get(verifyJWT,deleteTweet)

router.route("/get-user-tweet/:userId").get(verifyJWT,getUserTweets)

export default router;