import { prisma } from "../lib/prisma.js";
import bcrypt from 'bcryptjs';

async function logIn(req, res){
    try {
        const user = await prisma.user.findFirst({
            where: { username: req.body.username }
        })
        
        const match = await bcrypt.compare(req.body.password, user.password)

        if(!match) {
            res.json(null);
        }
        res.json(user);

    } catch (err) {
        console.log(err)
    }
}

export { logIn }