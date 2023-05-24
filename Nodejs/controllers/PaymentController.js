require('dotenv').config({path: __dirname + '/../.env'})
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const path = require("path");
const User = require("../models/User"); // import the User model
const mongoose = require('mongoose');
const { json } = require('body-parser');

const createCharge = async (req,res) =>{
    try{
        const user = await User.findById(req.body.id);
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }

        const sendUser ={
            name: user.name,
            email: user.email
        }

        const customer = await createCustomer(sendUser);

        if(!customer){
            return res.status(400).json({ message: "Failed to create customer invoice"});
        }
        
        const sendCardToken = {
            name: user.name,
            number: req.body.cardNumber,
            exp_month: req.body.cardExpMonth,
            exp_year: req.body.cardExpYear,
            cvc : req.body.cardCVC,
        }

        const card_Token = await createCardToken(sendCardToken,customer.id);
        // console.log(sendCardToken);
        return res.json({card: card_Token});
        console.log("Card-token : "+card_Token);

        if(!card_Token){
            return res.status(400).json({ message: "Wrong Card credentials"});
        }


        console.log("Card : "+card);
        if(!card){
            return res.status(400).json({ message: "Failed to create card"});
        }
        return res.status(200).json({card: card_Token});
    }
    catch(err)
    {
    //    console.log(err);
    }
}

const createCustomer = async (user) =>{
    try{
        const customer = await stripe.customers.create({
            name: user.name,
            email: user.email
        })
        return customer;
    }catch(err){
        console.log("from create Customer "+err);
    }
} 


const createCardToken = async (card,customerID) =>{
    try{
        const card_Token = await stripe.tokens.create({
            card: {
                name: card.name,
                number: card.number,
                exp_month: card.exp_month,
                exp_year: card.exp_year,
                cvc: card.cvc,
              },
        });
        const mycard = await stripe.customers.createSource(customerID, {
            source: `${card_Token.id}`
        });
        return mycard;
    }catch(err){
        console.log("from create card token "+err);
    }
} 
module.exports = {
    createCharge
}