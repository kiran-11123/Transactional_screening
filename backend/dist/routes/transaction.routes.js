import express from 'express';
const transaction_router = express.Router();
import { screening_controller } from '../controllers/transaction.controller.js';
transaction_router.post('/screening', screening_controller);
export default transaction_router;
//# sourceMappingURL=transaction.routes.js.map