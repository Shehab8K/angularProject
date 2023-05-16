const Joi = require("joi");
const express = require("express");
const multer = require("multer");
const cors = require('cors');

const fs = require("fs");
const Product = require("../models/Product");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "uploads/";
    fs.mkdirSync(uploadDir, { recursive: true }); // Create the directory if it doesn't exist
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

var upload = multer({ storage: storage });

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

//create product

// const { error } = validateProduct(req.body);
// if (error) return res.status(400).send(error.details[0].message);


router.post("/", upload.array("file"), async (req, res) => {
  try {
    if (req.files && req.files.length > 0) {
      // Handle multiple file uploads
      const fileNames = req.files.map((file) => file.path);

      const product = await Product.create({
        name: req.body.name,
        price: req.body.price,
        os: req.body.os,
        tag: req.body.tag,
        type: req.body.type,
        description: req.body.description,
        // releasedDate: req.body.releasedDate,
        images: fileNames, // Save file paths in the 'files' field of the product
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


// router.post("/", upload.array("file"), function (req, res, next) {
//   const files = req.files;
//   if (files) {
//     res.json(req.files);
//   } else throw "error";
// });



function validateProduct(product) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    price: Joi.number().min(0).required(),
  });
  return schema.validate(product);
}


module.exports = router;

