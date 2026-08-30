import { prisma } from "../lib/prisma.js";
import bcrypt from 'bcryptjs'
import signJwt from '../authentication/signJwt.js'

async function createUser(req, res){
    try{
        let user = await prisma.user.findUnique({
            where: { username: req.body.username },
        })

        if(user != null){
            console.log("user already exists")
            res.end()
            return;
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        let info = {
            username: req.body.username,
            password: hashedPassword
        }
        if(req.body.email) info.email = req.body.email;

        await prisma.user.create({data: info})

        user = await prisma.user.findUnique({
            where: { username: req.body.username },
            select: { username: true , id: true}
        })
        
        const jwt = signJwt(user)
        res.json({ success: true, user: user, token: jwt.token, expiresIn: jwt.expires});

    } catch (err) {
        console.log(err)
    }
}

export { createUser }