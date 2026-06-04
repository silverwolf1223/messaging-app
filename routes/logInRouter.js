import { Router } from 'express';
import { logIn } from '../controllers/logInController.js';
const router = Router();

    router.post('/', logIn) //authenticate user

export default router;