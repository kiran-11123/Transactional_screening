import api_key_model from "../config/api.key.schema.js";
import logger from "../utils/logging.service.js";
import bcrypt from 'bcryptjs';
export const api_key_create_service = async (idempotent_key, email) => {
    logger.info(`Request for API creation received in service`);
    try {
        const check_email = await api_key_model.findOne({ email: email });
        if (check_email) {
            logger.info('API Key for this mail is already exists');
            throw new Error('API Key for this mail is already exists');
        }
        const hashed_api_key = await bcrypt.hash(idempotent_key, 10);
        const new_api_key = new api_key_model({
            api_key: hashed_api_key
        });
        const result = await new_api_key.save();
        logger.info(`API key created successfully in service`);
        return true;
    }
    catch (er) {
        logger.error(`Error in API key creation`, { error: er });
        throw er;
    }
};
export const delete_api_key_service = async (idempotent_key) => {
    logger.info(`Request for API key deletion received in service`);
    try {
        const stored_api_keys = await api_key_model.find({});
        for (const stored_api_key of stored_api_keys) {
            const is_match = await bcrypt.compare(idempotent_key, stored_api_key.api_key);
            if (is_match) {
                const result = await api_key_model.deleteOne({ _id: stored_api_key._id });
                logger.info(`API key deleted successfully in service`, { result: result });
                return true;
            }
        }
        logger.warn(`Invalid API key deletion attempt`, { idempotent_key });
        throw new Error('Invalid API key');
    }
    catch (er) {
        logger.error(`Error in API key deletion`, { error: er });
        throw er;
    }
};
export const api_key_validation_service = async (idempotent_key) => {
    logger.info(`Request for API key validation received in service`);
    try {
        const stored_api_keys = await api_key_model.find({});
        for (const stored_api_key of stored_api_keys) {
            const is_match = await bcrypt.compare(idempotent_key, stored_api_key.api_key);
            if (is_match) {
                return true;
            }
        }
        logger.warn(`Invalid API key attempt`, { idempotent_key });
        throw new Error('Invalid API key');
    }
    catch (er) {
        logger.error(`Error in API key validation`, { error: er });
        throw er;
    }
};
//# sourceMappingURL=api.key.service.js.map