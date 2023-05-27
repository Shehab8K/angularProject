const { storage }= require("../storage/storage")
const multer = require('multer')
const uploadProduct= multer({storage}).array('imageURL',5)

module.exports={
    uploadProduct
}