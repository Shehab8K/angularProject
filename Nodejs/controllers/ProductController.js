const Joi = require("joi");
const express = require("express");
const Product = require("../models/Product");
const router = express.Router();
// //enable parsing of json object in the body
// router.use(express.json());
// router.use(express.urlencoded({extended: true}));
// // app.use(express.static('public'));

// const products= [
//     {id:1, name: "game1", price: 100},
//     {id:2, name: "game2", price: 90},
//     {id:3, name: "game35", price: 120}
// ]
// test
// router.get('/test',(req,res)=>{
//     res.send("hello");
//    });
//all courses
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
router.get('/:id',async (req,res)=>{
  try{
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    res.status(200).json(product);
  }catch(error){
    console.error(error);
    res.status(500).send("An error occurred while retrieving the product");
  }
});

//create product
router.post("/", async (req, res) => {
  // const { error } = validateProduct(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  try {
    const product = await Product.create({
      name: req.body.name,
      price: req.body.price,
      os:req.body.os,
      tag:req.body.tag,
      type:req.body.type,
      description:req.body.description,
      // releasedDate:req.body.releasedDate,

    });
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while creating the product.");
  }
});

// router.put('/:id',(req,res)=>{
//     //look up the product
//     const product = products.find(c=>c.id === parseInt(req.params.id));
//     //if not exiting, return 404
//     if(!product) //404
//         return res.status(404).send("The product with the given id is not found");
//     //validate
//     //if invalid, return 400 - Bad request
//     const { error } = validateProduct(req.body);
//     // console.log(result);
//     if(error)
//         return res.status(400).send(error.details[0].message);
//     //update product
//     product.name=req.body.name;
//     // product.price=req.body.price;
//     res.send(product);
//     //return updated product
// })

// // delete product
// router.delete('/:id',(req,res)=>{
//     //look up the product
//     const product = products.find(c=>c.id === parseInt(req.params.id));
//     //if not exiting, return 404
//     if(!product) return res.status(404).send("The product with the given id is not found");
//     //delete
//     const index = products.indexOf(product);
//     products.splice(index,1);
//     res.send(product);
// })

function validateProduct(product) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    price: Joi.number().min(0).required(),
  });
  return schema.validate(product);
}

module.exports = router;

// //port
// const port = process.env.PORT || 3000;
// router.listen(port,()=>console.log(`listing on port ${port}`))
