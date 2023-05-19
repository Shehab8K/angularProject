require('dotenv').config();
const Joi = require("joi");
const express = require("express");
const multer = require('multer');
const cors = require('cors');

const fs = require("fs");
const Product = require("../models/Product");

const router = express.Router();
const cloudinary = require('cloudinary').v2;


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});


const storage = multer.diskStorage({});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    // Check file type and reject non-image files
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed.'));
    }
    cb(null, true);
  }
});


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



router.post("/", upload.array("file"), async (req, res) => {
  try {
    // Validate the request body
    const { error } = validateProduct(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    if (req.files && req.files.length > 0) {
      // Handle multiple file uploads
      const fileNames = [];
      
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, { folder: 'games' });
        fileNames.push(result.secure_url);
        // Remove the temporary file after upload
        fs.unlinkSync(file.path);
      }

      const product = await Product.create({
        name: req.body.name,
        price: req.body.price,
        os: req.body.os,
        tag: req.body.tag,
        type: req.body.type,
        description: req.body.description,
        releasedDate: req.body.releasedDate,
        images: fileNames, // Save the secure URLs of the uploaded images
      });

      res.status(200).json(product);
    } else {
      return res.status(400).send("No files uploaded");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while creating the product.");
  }
});

//update product

router.put("/:id", upload.array("file"), async (req, res) => {
  try {
     // Validate the request body
    //  const { error } = validateProduct(req.body);
    //  if (error) {
    //    return res.status(400).json({ error: error.details[0].message });
    //  }
    const { name, price, os, tag, type, description, releasedDate } = req.body;

    const updatedFields = {
      name,
      price,
      os,
      tag,
      type,
      description,
      releasedDate,
    };

    if (req.files && req.files.length > 0) {
      // Handle multiple file uploads
           // Delete old images
           const product = await Product.findById(req.params.id);
          //  console.log(product.images);
           if (product.images && product.images.length > 0) {
             const publicIds = product.images.map((image) => {
               const filename = image.split("/").pop();
               return `games/${filename.split(".")[0]}`;
             });
     
             await cloudinary.api.delete_resources(publicIds);
           }
      const fileNames = [];

      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, { folder: 'games' });
        fileNames.push(result.secure_url);
        // Remove the temporary file after upload
        fs.unlinkSync(file.path);
      }
      updatedFields.images = fileNames;
    }
    const product = await Product.findByIdAndUpdate(req.params.id, updatedFields, { new: true });

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while updating the product.");
  }
});


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



const validateProduct = (data) => {
  const productSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    os: Joi.string().required(),
    tag: Joi.string().required(),
    type: Joi.string().required(),
    description: Joi.string().required(),
    releasedDate: Joi.date().required(),
  });

  return productSchema.validate(data);
};

module.exports = router;

