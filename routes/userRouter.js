import { Router } from 'express';
const router = Router();

    router.get('/friends', ) //return friends list
    router.get('/settings', ) //return settings
    router.get('/reqest', ) //return friend requests
    router.post('/send/:id', ) //send friend requests
    router.post('/accept/:id', ) //accept friend requests
    router.post('/reject/:id', ) //reject friend requests
    router.get('/', ) //gethome

export default router;