const Ajv = require("ajv");
const ajv = new Ajv();

const OrdersSchema = {
    type:"object",
    properties:{
       
    },
    required:[],
    additionalProperties:false
}
module.exports = ajv.compile(OrdersSchema);