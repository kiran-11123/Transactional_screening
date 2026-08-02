import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import logger from './utils/logging.service.js';
import ConnectDB from './config/mongoose.config.js';
import transaction_router from './routes/transaction.routes.js';
import admin_router from './routes/admin.register.routes.js';
import cookieParser  from 'cookie-parser'
import api_key_create_router from './routes/api.key.routes.js';
import public_end_point_router from './routes/public.end.point.routes.js';

dotenv.config();



const PORT = process.env.PORT || 5000
const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser());
await ConnectDB();



app.get("/health" , (req,res)=>{
    logger.info('HealthCheck API is running')
     res.status(200).json({
        message :'Transaction screening service is running'
     })
})



app.use("/api/transaction" , transaction_router);
app.use("/api/admin" , admin_router);
app.use("/api/api-key" , api_key_create_router);
app.use("/api/public" , public_end_point_router);



app.listen(PORT , ()=>{

     logger.info(`Screening service is running on port ${PORT}`)
     console.log(`Screening service is running on port ${PORT}`)
})