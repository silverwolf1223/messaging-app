import { Router } from 'express';
const router = Router();
import { getFriends, getHome, getSettings, updateSettings, getRequests, sendRequest, acceptRequest, removeRequest } from '../controllers/userController.js'

    router.get('/friends', getFriends) //return friends list
    router.get('/settings', getSettings) //return settings
    router.put('/settings', updateSettings) //post new settings
    router.get('/requests', getRequests) //return friend requests
    router.post('/send', sendRequest) //send friend requests
    router.post('/accept', acceptRequest) //accept friend requests
    router.post('/reject', removeRequest) //reject friend requests
    router.get('/', getHome) //gethome

export default router;