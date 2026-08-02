import type { Request , Response } from "express";
import logger from "../utils/logging.service.js";
import { api_key_validation_service } from "../services/api.key.service.js";
import { transaction_service } from "../services/transaction.service.js";

export const public_api_with_key = async(req : Request , res :Response)=>{
    
    logger.info('Entered into the publi api controller')
    try{

        const api_key  =req.body.api_key;
        const {sender_customer_id , receiver_customer_id , amount , country_origin , country_destination} = req.body;
        if(!api_key){
            logger.warn('Validation api key error for this request');
            return res.status(401).json({
                message : 'API key is required',
                
            })
        }
        const key_validation = await api_key_validation_service(api_key);
        if(!key_validation){
            logger.warn('Invalid API key for this request');
            return res.status(401).json({
                message : 'Invalid API key',
            })
        }
 logger.info('Validation successful for transaction screening request', { sender_customer_id: sender_customer_id  , receiver_customer_id: receiver_customer_id  });
        const result = await transaction_service({sender_customer_id , receiver_customer_id , amount , country_origin , country_destination})
        logger.info('Transaction screening result', { result: result });
        return res.status(200).json({
            message : 'Transaction screening result',
            result : result
        })         




        

    }
    catch(er){

        logger.error('Error in public api controller', { error: er });
        return res.status(500).json({
            message : 'Internal server error'
        })
         
    }

}