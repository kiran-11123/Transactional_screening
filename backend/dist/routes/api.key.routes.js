import express from 'express';
import { api_key_create_controller } from '../controllers/api_key_create.controller.js';
const api_key_create_router = express.Router();
api_key_create_router.post('/create', api_key_create_controller);
export default api_key_create_router;
//# sourceMappingURL=api.key.routes.js.map