import mongoose from 'mongoose';

const admin_user_schema  = new mongoose.Schema({
    email : {type : String , required : true},
    username : {type : String , required : true},
    password : {type : String , required : true}
},{
    timestamps : true
})

const admin_user_model = mongoose.model('admin_user' , admin_user_schema)

export default admin_user_model;
