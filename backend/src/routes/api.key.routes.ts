import express from 'express'
import Authentication_token from '../middleware/auth.middleware.js';
import { api_key_create_controller ,api_key_delete_controller } from '../controllers/api_key_create.controller.js';
const api_key_create_router = express.Router();
// only authorized users can create api keys

api_key_create_router.post('/create' , Authentication_token ,  api_key_create_controller)
api_key_create_router.delete('/delete' , Authentication_token ,  api_key_delete_controller)
export default api_key_create_router;