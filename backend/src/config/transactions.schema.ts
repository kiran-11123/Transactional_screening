import mongoose from "mongoose";


/* 

transaction = {

    "sender_customer_id": "CUST_1081",

    "receiver_customer_id": "CUST_5201",

    "amount": 5500000,

    "country_origin": "India",

    "country_destination": "USA"

}

*/ 
const transaction_schema = new mongoose.Schema({

    sender_customer_id  :{type : String , required :true},
    receiver_customer_id :  {type : String ,  required : true},
    amount : {type : Number , required : true },
    country_origin : {type  : String ,
        
        enum : [
    "USA",
    "India",
    "UK",
    "Germany",
    "France",
    "Canada",
    "Australia",
    "Singapore",
    "UAE",
    "Brazil"
] , 
        required : true},
    country_destination : {type : String , 
        
            enum : [
    "USA",
    "India",
    "UK",
    "Germany",
    "France",
    "Canada",
    "Australia",
    "Singapore",
    "UAE",
    "Brazil"
] , 
    required  : true },

    result  : {type : String , default : 'Manual Investigation'} 
     
},{
    timestamps : true
})


const transaction_model = mongoose.model('transactions_screening_data' , transaction_schema );

export default transaction_model;