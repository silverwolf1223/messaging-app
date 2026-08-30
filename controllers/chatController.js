import { prisma } from "../lib/prisma";

async function getChat(req, res){
    try {
        const chat = await prisma.chat.findFirst({
            where: { id: req.body.chatId },
            include: {
                message: {
                    take: 50,
                    orderBy: { createAt: 'desc' }
                }
            }
        })

        res.json(chat)

    } catch (err) {
        console.log(err)
    }
}

async function postMessage(req, res){
    try {
        await prisma.chat.update({
            where: { id: req.body.chatId },
            data: {
                messages: {
                    create: {
                        text: req.body.text,
                        userId: req.user.id,
                        chatId: req.body.chatId
                    }
                }
            }
        })
    } catch (err) {
        console.log(err)
    }
}

async function delMessage(req, res){
    try {
        await prisma.chat.update({
            where: { id: req.body.chatId },
            data: {
                messages: {
                    delete: {
                        where: {
                            id: req.body.messageId
                        }
                    }
                }
            }
        })
    } catch (err) {
        console.log(err)
    }
}

async function editMessage(req, res){
    try {
        await prisma.chat.update({
            where: { id: req.body.chatId },
            data: { 
                messages: {
                    where: { id: req.body.chatId },
                    data: { text: req.body.text }
                }
            }
        })
    } catch (err) {
        console.log(err)
    }
}

export { getChat, postMessage, delMessage, editMessage }