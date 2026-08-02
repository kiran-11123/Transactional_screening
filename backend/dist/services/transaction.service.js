import transaction_model from "../config/transactions.schema.js";
import logger from "../utils/logging.service.js";
import axios from "axios";
import dotenv from 'dotenv';
import mongoose from "mongoose";
dotenv.config();
const fast_api = process.env.FAST_API;
export async function transaction_service({ sender_customer_id, receiver_customer_id, amount, country_origin, country_destination }) {
    const session = await mongoose.startSession();
    logger.info('Transaction service called with data', { sender_customer_id, receiver_customer_id });
    try {
        session.startTransaction();
        const save_data = new transaction_model({
            sender_customer_id,
            receiver_customer_id,
            amount,
            country_origin,
            country_destination
        });
        await save_data.save({ session });
        logger.info('Transaction data saved successfully', { sender_customer_id, receiver_customer_id });
        const response = await axios.post(`${fast_api}predict`, {
            sender_customer_id,
            receiver_customer_id,
            amount,
            country_origin,
            country_destination
        });
        if (response.data.probability >= 0.6 && response.data.risk === 'Normal') {
            save_data.result = 'Manual Investigation';
        }
        else if (response.data.risk === 'High') {
            save_data.result = 'True Positive';
        }
        else {
            save_data.result = 'False Positive';
        }
        await save_data.save({ session });
        await session.commitTransaction();
        logger.info("Transaction screened successfully", {
            sender_customer_id,
            result: save_data.result
        });
        return save_data.result;
    }
    catch (er) {
        await session.abortTransaction();
        logger.error('Error in transaction service', { error: er });
        throw er;
    }
    finally {
        session.endSession();
    }
}
//# sourceMappingURL=transaction.service.js.map