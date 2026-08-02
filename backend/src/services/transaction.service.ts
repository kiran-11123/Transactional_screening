import transaction_model from "../config/transactions.schema.js"
import logger from "../utils/logging.service.js"
import outbox_model from "../config/outbox.db.js"
import axios from "axios"
import dotenv from 'dotenv'
import mongoose from "mongoose"
dotenv.config()

const fast_api = process.env.FAST_API

interface Transaction{
    sender_customer_id  : string,
    receiver_customer_id : string,
    amount : number , 
    country_origin : string,
    country_destination : string
    idempotent_key : string

}

export async function transaction_service( {sender_customer_id , receiver_customer_id , amount , country_origin , country_destination , idempotent_key} : Transaction ){
    
    const session = await mongoose.startSession();
    logger.info('Transaction service called with data', { sender_customer_id, receiver_customer_id });
    try{

          session.startTransaction();

          const existing_transaction = await transaction_model.findOne({ idempotent_key }).session(session);
          if (existing_transaction) {
              logger.info('Idempotent key already exists, returning existing result', { idempotent_key, result: existing_transaction.result });
              return existing_transaction.result;
          }
        
        const save_data =  new transaction_model({
            sender_customer_id,
            receiver_customer_id,
            amount,
            country_origin,
            country_destination,
            idempotent_key
        })
        await save_data.save({session});

        const save_idempotent_key = new outbox_model({
            idempotent_key,
            status : 'processing'
        })
        await save_idempotent_key.save({session});


        logger.info('Transaction data saved successfully', { sender_customer_id, receiver_customer_id });

        
        
        const response =await  axios.post(`${fast_api}predict` , {
            sender_customer_id,
            receiver_customer_id,
            amount,
            country_origin,
            country_destination
        })


        
        if(response.data.probability >= 0.6 ){
             save_data.result = 'Manual Investigation'
        }
        else if(response.data.risk === 'Suspicious'){
            save_data.result = 'True Positive'
        }
        else {
            save_data.result = 'False Positive'
        }

         await save_data.save({session});


         const update_idempotent_key = await outbox_model.findOneAndUpdate(
        { idempotent_key },
        { status: 'success' },
        { new: true, session }
    );
    



        await session.commitTransaction();


          logger.info(
        "Transaction screened successfully",
        {
            sender_customer_id,
            result: save_data.result
        }
    );
        

    
       
        return save_data.result;

         

    }
    catch(er){

        await session.abortTransaction();
        logger.error('Error in transaction service', { error: er });
        
        await outbox_model.findOneAndUpdate(
            { idempotent_key },
            { status: 'failed' },
            { new: true, session }
        );

        throw er;
         
    }
    finally{
         session.endSession();
    }
}