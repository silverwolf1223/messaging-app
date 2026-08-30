import { prisma } from "../lib/prisma.js";
import bcrypt from 'bcryptjs';
import signJwt from '../authentication/signJwt.js'


async function logIn(req, res){
    const user = await prisma.user.findUnique({where: { username: req.body.username }})
    if(!user) {
        res.json({ msg: "error: user not found"})
    }

    const match = await bcrypt.compare(req.body.password, user.password)
    if(!match) {
        res.json({ msg: "error: incorrect password" })
    }

    const jwt = signJwt(user)
    res.json({ success: true, user: user, token: jwt.token, expiresIn: jwt.expires});
}

export { logIn }