
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { 
    addVideoToPlaylist, 
    createPlaylist, 
    deletePlaylist, 
    getPlaylistById, 
    getUserPlaylists, 
    removeVideoFromPlaylist, 
    updatePlaylist 
} from "../controllers/playlist.controller.js";


const router = Router()

router.route("/create-playlist").post(createPlaylist)

router.route("/update-playlist/:playlistId").post(verifyJWT,updatePlaylist)

router.route("/delete-playlist/:playlistId").get(verifyJWT,deletePlaylist)

router.route("/get-playlist/:playlistId").get(verifyJWT,getPlaylistById)

router.route("/get-User-playlist/:userId").get(verifyJWT,getUserPlaylists)

router.route("/add-video-playlist/:playlistId/:videoId").post(verifyJWT,addVideoToPlaylist)

router.route("/remove-video-playlist:/playlistId/:videoId").post(verifyJWT,removeVideoFromPlaylist)



export default router;