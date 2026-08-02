import logger from "../utils/logging.service.js";
import { transaction_service } from "../services/transaction.service.js";
import zod from "zod";
const checking_schema = zod.object({
    sender_customer_id: zod.string().min(1, "sender_customer_id is required"),
    receiver_customer_id: zod.string().min(1, "receiver_customer_id is required"),
    amount: zod.number().min(1, "amount is required"),
    country_origin: zod.string().min(1, "country_origin is required"),
    country_destination: zod.string().min(1, "country_destination is required")
});
export const screening_controller = async (req, res) => {
    logger.info('transcation screening request recieved to controller ');
    try {
        const { sender_customer_id, receiver_customer_id, amount, country_origin, country_destination } = req.body;
        const { error, data } = checking_schema.safeParse({
            sender_customer_id,
            receiver_customer_id,
            amount,
            country_origin,
            country_destination
        });
        if (error) {
            logger.error('Validation error in transaction screening request', { error: error });
            return res.status(400).json({
                message: 'Validation error',
                error: error
            });
        }
        logger.info('Validation successful for transaction screening request', { sender_customer_id: data.sender_customer_id, receiver_customer_id: data.receiver_customer_id });
        const result = await transaction_service({ sender_customer_id, receiver_customer_id, amount, country_origin, country_destination });
        logger.info('Transaction screening result', { result: result });
        return res.status(200).json({
            message: 'Transaction screening result',
            result: result
        });
    }
    catch (er) {
        logger.error('Error in transaction screening', { error: er });
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
};
//# sourceMappingURL=transaction.controller.js.map