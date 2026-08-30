import path from 'path'
import fs from 'fs'
import { prisma } from "../lib/prisma.js";
import passport from 'passport'
import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt';

const __dirname = import.meta.dirname

const PUB_KEY = fs.readFileSync('./keys/public.pem', 'utf8')

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithm: "RS256"
}

const strategy = new JwtStrategy(opts, async (payload, done) => {
    try {
        const user = await prisma.user.findFirst({
            where: { id: payload.id },
        })
        if (!user) {
            return done(null, false);
        }
        return done(null, user)
    } catch(err) {
        return done(err);
    }
})

export default strategy