import { admin_registration_service, admin_signin_model } from "../services/admin.register.service.js";
import logger from '../utils/logging.service.js';
export const admin_registration_controller = async (req, res) => {
    logger.info('Admin registration request received to controller');
    try {
        const { email, username, password } = req.body;
        if (!email || !username || !password) {
            logger.warn('Validation error in admin registration request', { email, username });
            return res.status(400).json({
                message: 'Validation error',
                error: 'email , username and password are required'
            });
        }
        const result = await admin_registration_service(email, username, password);
        logger.info('Admin registration result', { result: result });
        return res.status(200).json({
            message: 'Admin registration successful',
            result: result
        });
    }
    catch (er) {
        logger.error('Error in admin registration', { error: er });
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
};
export const admin_signin_controller = async (req, res) => {
    logger;
    try {
    }
    catch (er) {
    }
};
//# sourceMappingURL=admin.register.controller.js.map