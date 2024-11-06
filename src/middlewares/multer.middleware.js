import multer from 'multer'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)

      //if there are multiple file uploaded by user with same it will get overwrite but in this the file will be there on server for very tiny time therefore it doesnt affect it

    }
  })
  
export const upload = multer({ 
    storage,
    //there is middleware with the name of storage
})
