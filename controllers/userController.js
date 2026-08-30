import { prisma } from "../lib/prisma.js";

async function getHome(req, res){
    try{
        const user = await prisma.user.findFirst({
            where: { id: req.user.id },
            select: {
                username: true,
                friends: true,
                chats: true,
                settings: true,
            }
        })

        res.json(user)

    } catch(err) {
        console.log(err)
    }
}

async function getFriends(req, res){
    try {
        const friends = await prisma.user.findFirst({
            where: { id: req.user.id },
            include: { friends: true }
        })

        console.log(friends)
        res.json(friends)

    } catch (err) {
        console.log(err)
    }
}

async function getSettings(req, res){
    try {
        const settings = await prisma.user.findFirst({
            where: { id: req.user.id },
            select: {
                settings: true
            }
        })

        res.json(settings)

    } catch (err) {
        console.log(err)
    }
}

async function updateSettings(req, res){
    try {
        const newSettings = {
            notifs: req.body.notifs,
            themeColor: req.body.themeColor,
            pfp: req.body.pfp
        }

        await prisma.user.update({
            where: {
                id: req.user.id
            },
            data: {
                settings: {
                    data: newSettings
                }
            }
        })

        res.redirect(`/${req.params.id}`)

    } catch (err) {
        console.log(err)
    }
}

async function getRequests(req, res){
    try {
        const requests = await prisma.request.findMany({
            where: {
                toId: req.user.id
            }
        })

        res.json(requests)

    } catch (err) {
        console.log(err)
    }
}

async function sendRequest(req, res){
    try {
        await prisma.request.create({
            data: {
                toId: req.body.requestId,
                fromId: req.user.id
            }
        })

        res.redirect(`/${req.params.id}/requests`)

    } catch (err) {
        console.log(err)
    }
}

async function acceptRequest(req, res){
    try {
        const request = await prisma.request.findUnique({where: {id: req.body.id}})

        const newChat = await prisma.chat.create({
            data: {
                users: {
                    connect: [
                        { id: req.body.id },
                        { id: request.toId }
                    ]
                }
            }
        })

        await prisma.$transaction([
            prisma.user.update({
                where: {id: request.toId},
                data: {
                    friends: {
                        connect: {
                            id: request.fromId
                        }
                    }
                }
            }),

            prisma.user.update({
                where: {id: request.fromId},
                data: {
                    friends: {
                        connect: {
                            id: request.toId
                        }
                    }
                }
            }),

            
        ])

        await prisma.request.delete({where: {id: req.body.id}})

        res.redirect(`/${req.params.id}/requests`)

    } catch (err) {
        console.log(err)
    }
}

async function removeRequest(req, res){
    try {
        const user = await prisma.user.findUnique({ where: { id: req.params.id }})
        const updatedList = user.requests.filter(item => item.id !== req.body.id)

        await prisma.user.update({
            where: {id: req.params.id},
            data: {
                requests: {
                    set: updatedList
                }
            }
        })

        res.redirect(`/${req.params.id}/requests`)

    } catch (err) {
        console.log(err)
    }
}

export { getFriends, getHome, getSettings, updateSettings, getRequests, sendRequest, acceptRequest, removeRequest }