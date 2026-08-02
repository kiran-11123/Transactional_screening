import express from 'express'
import { admin_registration_controller , admin_signin_controller } from '../controllers/admin.register.controller.js';
const admin_router =express.Router();

admin_router.post('/register' , admin_registration_controller)
admin_router.post('/signin' , admin_signin_controller)

export default admin_router