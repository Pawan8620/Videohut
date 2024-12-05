import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit:"10kb"}))
app.use(express.urlencoded({extended: true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//routes import
import  userRouter  from './routes/user.routes.js'
import videoRouter from './routes/video.routes.js'
import tweetRouter from './routes/tweet.routes.js'
import playlistRouter from './routes/playlist.routes.js'
import likeRouter from './routes/like.routes.js'
import healthcheckRouter from './routes/healthCheck.routes.js'
import dashboardRouter from './routes/dashboard.routes.js'
import commentRouter from './routes/comment.routes.js'

//routes declaration
app.use("/api/v1/users",userRouter)
app.use("/api/v1/users",videoRouter)
app.use("/api/v1/users",tweetRouter)
app.use("/api/v1/users",playlistRouter)
app.use("/api/v1/users",likeRouter)
app.use("/api/v1/users",healthcheckRouter)
app.use("/api/v1/users",dashboardRouter)
app.use("/api/v1/users",commentRouter)

//http://localhost:8000/api/v1/users/register

export {app}