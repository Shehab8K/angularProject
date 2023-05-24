require('dotenv').config({path: __dirname + '/../.env'})
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const path = require("path");
const User = require("../models/User"); // import the User model

const createPayment = async (req,res) =>{
    try{

        /*
        *     Need in body => Id, cardNumber, cardExpMonth, cardExpYear, cardCVC, price
        *     Price should be numbers not strings, price can be 12.50
        */


        // Find User
        const user = await User.findById(req.body.id);
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }

        // send name, email to create customer
        const sendUser ={
            name: user.name,
            email: user.email
        }

        const customer = await createCustomer(sendUser);

        if(!customer){
            return res.status(400).json({ message: "Failed to create customer invoice"});
        }

        // Send card data and customer ID to make source and get a card
        const sendCardToken = {
            name: user.name,
            number: req.body.cardNumber,
            exp_month: req.body.cardExpMonth,
            exp_year: req.body.cardExpYear,
            cvc : req.body.cardCVC,
        }

        const card_Token = await createCardToken(sendCardToken,customer.id);

        if(!card_Token){
            return res.status(400).json({ message: "Wrong Card credentials"});
        }

        // Make a charge 

        const bill = {
            reciept_email: user.email,
            amount: req.body.price,
            card : card_Token.id,
            customerID: customer.id 
        }
        const charge = await createCharges(bill);

        if(!charge){
            return res.status(400).json({ message: "Failed to Purchase order"});
        }

        return res.status(200).json({card: charge});
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
        return {"createCustomer":err};
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
        return {"cardToken":err};
    }
} 

const createCharges = async (customer) =>{
    try{
        const createCharge = await stripe.charges.create({
            reciept_email: customer.email,
            amount: customer.amount*100,
            currency: 'USD',
            card : customer.card,
            customer: customer.customerID, 
        })
        return createCharge;
    }catch(err){
        console.log("from create Customer "+err);
        return {"charges":err};
    }
} 

module.exports = {
    createPayment
}