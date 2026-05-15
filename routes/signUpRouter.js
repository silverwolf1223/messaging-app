import { Router } from 'express';
const router = Router();
import { createUser } from '../controllers/signUpController.js';

    router.post('/', createUser)//create user

export default router;