import { admin_registration_service, admin_signin_model } from "../services/admin.register.service.js";
import logger from '../utils/logging.service.js';
import jwt from 'jsonwebtoken';
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
    logger.info('Admin sign-in request received to controller');
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            logger.warn('Validation error in admin sign-in request', { email });
            return res.status(400).json({
                message: 'Validation error',
                error: 'email and password are required'
            });
        }
        const result = await admin_signin_model(email, password);
        logger.info('Admin sign-in result');
        res.cookie("token", result, {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        });
        res.json({
            message: "Login success"
        });
        return res.status(200).json({
            message: 'Admin sign-in successful',
            token: result,
        });
    }
    catch (er) {
        logger.error('Error in admin sign-in', { error: er });
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
};
//# sourceMappingURL=admin.register.controller.js.map