import { prisma } from "../lib/prisma.js";

async function createUser(req, res){
    await prisma.user.create({
        data: {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }
    })
    console.log("user created")
    res.end();
}

export { createUser }