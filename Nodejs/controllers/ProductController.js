const Joi = require("joi");
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const Product = require("../models/Product");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
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
// router.post("/",upload.single('image'), async (req, res) => {
// const { error } = validateProduct(req.body);
// if (error) return res.status(400).send(error.details[0].message);

// try {

//   let imagePath = req.file; // Initialize imagePath variable

//   if (imagePath) {
//     imagePath = req.file.path; // Assign imagePath if file is uploaded
//      res.json(imagePath)
//   } else {
//     return res.status(400).send("No image file uploaded");
//   }

// const product = await Product.create({
//   name: req.body.name,
//   price: req.body.price,
//   os:req.body.os,
//   tag:req.body.tag,
//   type:req.body.type,
//   description:req.body.description,
//   imagePath: imagePath,
//   // releasedDate:req.body.releasedDate,

// });
// res.status(200).json(product);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("An error occurred while creating the product.");
//   }
// });


// router.post("/", upload.single("file"), function (req, res, next) {
//   const file = req.file;
//   if (file) {
//     res.json(req.file);
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

