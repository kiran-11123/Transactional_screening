import mongoose from 'mongoose'

const outbox_schema = new mongoose.Schema({
      
    idempotent_key : {type : String , required : true , unique : true},
    status : {type : String , enum : ['pending' , 'processing' , 'success' ,  'failed'] , default : 'pending'},

} ,{
    timestamps : true
})


const outbox_model = mongoose.model('outbox' , outbox_schema)
export default outbox_model; 