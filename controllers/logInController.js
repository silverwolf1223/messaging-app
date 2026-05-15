import { prisma } from "../lib/prisma.js";

async function logIn(req, res){
    const user = await prisma.user.findFirst({
        where: { username: "Silvy" }
    })
    console.log(user)
    res.json(user);
}

export { logIn }