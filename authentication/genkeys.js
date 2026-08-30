import crypto from 'crypto'
import fs from 'fs'

const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
    }
});

fs.writeFileSync('keys/public.pem', publicKey)
fs.writeFileSync('keys/private.pem', privateKey)

console.log('Public and private keys successfully generated');