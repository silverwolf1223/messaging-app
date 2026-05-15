import { Router } from 'express';
import { logIn } from '../controllers/logInController.js';
const router = Router();

    router.get('/', logIn) //authenticate user

export default router;