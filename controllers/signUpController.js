import { prisma } from "../lib/prisma.js";
import bcrypt from 'bcryptjs'

async function createUser(req, res){
    try{
        const user = await prisma.user.findUnique({
            where: { username: req.body.username }
        })

        if(user != null){ 
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

        res.end();

    } catch (err) {
        console.log(err)
    }
}

export { createUser }