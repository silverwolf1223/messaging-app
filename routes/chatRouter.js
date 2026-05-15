import { Router } from 'express';
const router = Router();

    router.post('/message', ) //create new message *trigger live update*
    router.put('/message/:id', ) //change message from user
    router.delete('/message/:id', ) //delete message from user
    router.post('/addUser', ) // add user to chat
    router.get('/', ) //return chat to print
    router.post('/', ) //creates a new chat between 2 users

export default router;