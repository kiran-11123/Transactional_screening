import  type {Request , Response} from 'express'
import { api_key_create_service , delete_api_key_service } from '../services/api.key.service.js'
import logger from '../utils/logging.service.js'
import crypto from 'crypto'

export const api_key_create_controller=async (req : Request , res:Response)=>{

    logger.info('API key creation request received to controller')
    try{
       const idempotent_key = crypto.randomUUID();
       
       //@ts-ignore
       const admin_email = req.user.email;

       const result = await api_key_create_service(idempotent_key , admin_email);
       logger.info('API key creation result', { result: result });
       return res.status(200).json({
            message : 'API key created successfully',
            result : idempotent_key
       })

    }
    catch(er : any){
        logger.error('Error in API key creation', { error: er });

        if(er.message === 'API Key for this mail is already exists'){
            return res.status(400).json({
                message : 'API Key for this mail is already exists',
                error : er.message
            })
        }
        return res.status(500).json({
            message : 'Internal server error'
        })
    
    }
} 


export const api_key_delete_controller=async (req : Request , res:Response)=>{

    logger.info('API key deletion request received to controller')
    try{
       const {idempotent_key} = req.body;

         if(!idempotent_key){
            logger.warn('Validation error in API key deletion request', { idempotent_key });

            return res.status(400).json({
                message : 'Validation error',
                error : 'idempotent_key is required'
            })
         }

         const result = await delete_api_key_service(idempotent_key);

            logger.info('API key deletion result', { result: result });
            return res.status(200).json({
                message : 'API key deleted successfully',
                result : result
            })

    }
    catch(er){
        logger.error('Error in API key deletion', { error: er });
        return res.status(500).json({
            message : 'Internal server error'
        })
    }

}