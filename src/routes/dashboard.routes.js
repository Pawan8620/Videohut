import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { 
    getChannelStats, 
    getChannelVideos 
} from "../controllers/dashboard.controller.js";

const router = Router();

router.route("/getChannelStats").get(verifyJWT, getChannelStats)

router.route("/getChannelVideo").get(verifyJWT, getChannelVideos)


export default router;