import path from 'path'
import fs from 'fs'
import jwt from 'jsonwebtoken'

const __dirname = import.meta.dirname

const pathToKey = path.join(__dirname, '../keys/private.pem')
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8')

const signJwt = function(user){

  const expiresIn = '1d';

  const payload = {
    id: user.id,
    iat: Date.now()
  }

  const signedToken = jwt.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: 'RS256'})

  return ({
    token: signedToken,
    expires: expiresIn
  })
}

export default signJwt