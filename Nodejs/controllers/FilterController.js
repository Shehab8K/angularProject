const express = require("express");
const cors = require('cors');

const Product = require("../models/Product");
const router = express.Router();

//filter by os
router.get("/", async (req, res) => {
    const osFilters = req.query.os || [];
    const query = osFilters.length > 0 ? { os: { $in: osFilters } } : {};
    console.log(query);
    try {
        const filteredProduct = await Product.find(query);
        if (!filteredProduct) {
            return res.status(404).send("No match!");
        }
        res.status(200).json(filteredProduct);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while retrieving the product");
    };
// });
// router.get("/", async (req, res) => {
//     const osFilters = req.query.os || [];
//     try {
//         let collection = await db.collection("products");
//         let filteredProduct = await collection.find(
//             { os: { $in: osFilters } }
//         )
//         if (!filteredProduct) {
//             return res.status(404).send("No match!");
//         }
//         res.status(200).json(filteredProduct);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("An error occurred while retrieving the product");
//     }
});
module.exports = router;
