require("dotenv").config();
const Joi = require("joi");
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const storage =require("../storage/storage")
const { uploadProduct } = require("../MiddleWares/MulterUpload");
const fs = require("fs");
const Product = require("../models/Product");

const router = express.Router();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// const storage = multer.diskStorage({});

// const upload = multer({
//   storage,
//   fileFilter: (req, file, cb) => {
//     // Check file type and reject non-image files
//     if (!file.mimetype.startsWith("image/")) {
//       return cb(new Error("Only image files are allowed."));
//     }
//     cb(null, true);
//   },
// });

//all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error("Error retrieving products:", error);
    res.status(500).json({ error: "Failed to retrieve products" });
  }
});

//one product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while retrieving the product");
  }
});


router.post("/", async (req, res) => {
  try {
     await uploadProduct(req, res, async function (err) {
      if (err) {
        return res.status(500).send("Error uploading file");
      } else {
        console.log("in put fucntion")

        let product = await Product.create({
          name: req.body.name,
          price: req.body.price,
          os: req.body.os,
          tag: req.body.tag,
          type: req.body.type,
          description: req.body.description,
          // releasedDate: req.body.releasedDate,
          // images: fileNames, // Save the secure URLs of the uploaded images
        });
        if (!product) {
          return res.status(400).send("There is No Product With this ID !");
        }
        
        product.images = [];
        
        if(req.files){
          let images = req.files;
          images.forEach((img) => {
            product["images"].push(process.env.CLOUD_PATH + img.filename) //name
            console.log(product);
          });
          console.log(images)
          product.save();
        }
        
        return res.status(200).json({ updatedProduct: product });
      }
    })
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error, Failed to update the product !");
}
}
);
//update product

router.put("/:id", async (req, res) => {
  
  try {
     await uploadProduct(req, res, async function (err) {
      if (err) {
        return res.status(500).send("Error uploading file");
      } else {

        // const dataForValidation = {
        //   name: req.body.name,
        //   price: req.body.price,
        //   os: req.body.os,
        //   tag: req.body.tag,
        //   type: req.body.type,
        //   description: req.body.description,
        //   releasedDate: req.body.releasedDate
        // }

        // console.log("comming")
        // console.log(req.body);
        // console.log(req.files);

        // const { error } = validateProduct(dataForValidation);

        // if(error)
        // {
        //   return res.status(400).json({ message: error.details });
        // }

        const product = await Product.findById(req.params.id)
        console.log(product)
        console.log("in put backend")
        if(!product)
        {
          console.log("User not found");
          return res.status(404).json({message: "Product not found"})
        }
        
        product.name = req.body.name || product.name;
        product.price = Number(req.body.price) || Number(product.price);
        product.os = req.body.os || product.os;
        product.tag = req.body.tag || product.tag;
        product.type = req.body.type || product.type;
        product.description = req.body.description || product.description;
        product.releasedDate = req.body.releasedDate || product.releasedDate;
        product.character = req.body.character || product.character; 
        
        if(req.files){

          if (product.images && product.images.length > 0) {
            const publicIds = product.images.map((image) => {
              const filename = image.split("/").pop();
              return `games/${filename.split(".")[0]}`;
            });
      
            await cloudinary.api.delete_resources(publicIds);
            product.images = [];
          }

          // Add new imagess
          let images = req.files;
          images.forEach((img) => {
            product["images"].push(process.env.CLOUD_PATH + img.filename) //name
          });

        }
        
        const updateProduct = await product.save();

        if(!updateProduct)
        {
          return res.status(400).json({message: "Failed to update product"});
        }
    
        return res.status(200).json(updateProduct);
      }
    })
  } catch (err) {
    console.log("error happened")
    console.error(err);
    res.status(500).send("An error occurred while updating the product.");
  }
}
);

//delete product
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete the images from Cloudinary
    if (product.images && product.images.length > 0) {
      const publicIds = product.images.map((image) => {
        const filename = image.split("/").pop();
        return `games/${filename.split(".")[0]}`;
      });

      await cloudinary.api.delete_resources(publicIds);
    }

    // Delete the product from the database
    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while deleting the product.");
  }
});

const validateProduct = (product) => {
  const productSchema = Joi.object({
    name: Joi.string(),
    price: Joi.number(),
    os: Joi.array(),
    tag: Joi.array(),
    type: Joi.array(),
    description: Joi.string(),
    releasedDate: Joi.date(),
  });
  return productSchema.validate(product);
};

// return productSchema.validate(data);

module.exports = router;
