import  type {Request , Response} from 'express'
import { api_key_create_service } from '../services/api.key.service.js'
import logger from '../utils/logging.service.js'
import crypto from 'crypto'

export const api_key_create_controller=async (req : Request , res:Response)=>{

    logger.info('API key creation request received to controller')
    try{
       const idempotent_key = crypto.randomUUID();

       const result = await api_key_create_service(idempotent_key);
       logger.info('API key creation result', { result: result });
       return res.status(200).json({
            message : 'API key created successfully',
            result : idempotent_key
       })

    }
    catch(er){
        logger.error('Error in API key creation', { error: er });
        return res.status(500).json({
            message : 'Internal server error'
        })
    
    }
} 