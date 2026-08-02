import transaction_model from "../config/transactions.schema.js";
import logger from "../utils/logging.service.js";
import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();
const fast_api = process.env.FAST_API;
export async function transaction_service({ sender_customer_id, receiver_customer_id, amount, country_origin, country_destination }) {
    logger.info('Transaction service called with data', { sender_customer_id, receiver_customer_id });
    try {
        const save_data = new transaction_model({
            sender_customer_id,
            receiver_customer_id,
            amount,
            country_origin,
            country_destination
        });
        await save_data.save();
        logger.info('Transaction data saved successfully', { sender_customer_id, receiver_customer_id });
        const response = axios.post(`${fast_api}predict`, {
            sender_customer_id,
            receiver_customer_id,
            amount,
            country_origin,
            country_destination
        });
        console.log(response);
        return true;
    }
    catch (er) {
        throw er;
    }
}
//# sourceMappingURL=transaction.service.js.map