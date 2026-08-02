import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import logger from "../utils/logging.service.js";
const MONGODB_URI : any  = process.env.MONGODB_URI 


const ConnectDB = async()=>{

    try {

        await mongoose.connect(MONGODB_URI);

        logger.info(
            "MongoDB connected successfully"
        );

    } catch (err:any) {

        logger.error(
            "Error while connecting MongoDB",
            {
                error: err.message,
                stack: err.stack
            }
        );

        process.exit(1);
    }
}

export default ConnectDB;