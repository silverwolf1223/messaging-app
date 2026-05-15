import { Router } from 'express';
const router = Router();
import { createUser } from '../controllers/signUpController.js';

    router.post('/', createUser)//create user
    router.get('/', (req, res, next) => {
        next()
    })

export default router;