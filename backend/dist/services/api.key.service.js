import api_key_model from "../config/api.key.schema.js";
import logger from "../utils/logging.service.js";
import bcrypt from 'bcryptjs';
export const api_key_create_service = async (idempotent_key) => {
    logger.info(`Request for API creation received in service`);
    try {
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
        const result = await api_key_model.deleteOne({ api_key: idempotent_key });
        logger.info(`API key deleted successfully in service`, { result: result });
        return true;
    }
    catch (er) {
        logger.error(`Error in API key deletion`, { error: er });
        throw er;
    }
};
//# sourceMappingURL=api.key.service.js.map