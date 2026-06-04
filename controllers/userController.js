import { prisma } from "../lib/prisma";

async function getHome(req, res){
    try{
        console.log("aaaaa")
        const user = await prisma.user.findFirst({
            where: { id: req.params.id },
            select: {
                username: true,
                friends: true,
                chats: true
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
            where: { id: req.params.id },
            select: {
                friends: true
            }
        })

        res.json(friends)

    } catch (err) {
        console.log(err)
    }
}

async function getSettings(req, res){
    try {
        const settings = await prisma.user.findFirst({
            where: { id: req.params.id },
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
                id: req.params.id
            },
            data: {
                settings: newSettings
            }
        })

        res.redirect(`/${req.params.id}`)

    } catch (err) {
        console.log(err)
    }
}

async function getRequests(req, res){
    try {
        const request = await prisma.user.findFirst({
            where: {
                id: req.params.id
            },
            select: {
                requests: true
            }
        })

        res.json(request)

    } catch (err) {
        console.log(err)
    }
}

async function sendRequest(req, res){
    try {
        const user = await prisma.user.findFirst({where: {id: req.params.id}})
        await prisma.user.update({
            where: {id: req.body.id},
            data: {
                requests: {
                    push: {
                        user
                    }
                }
            }
        })

        res.redirect(`/${req.params.id}/requests`)

    } catch (err) {
        console.log(err)
    }
}

async function acceptRequest(req, res){
    try {
        const user = await prisma.user.findFirst({where: {id: req.body.id}})
        await prisma.user.update({
            where: {id: req.params.id},
            data: {
                friends: {
                    push: {
                        user
                    }
                }
            }
        })

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