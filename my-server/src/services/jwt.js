import jsonwebtoken from 'jsonwebtoken'
import { secret } from '../constanst.js'

export function createToken(userData){
    const payload = {
        username: userData.username,
        email: userData.email,
        tel: userData.tel,
        _id: userData._id
    }

    const token = jsonwebtoken.sign(payload,secret, {expiresIn: '1d'})
    return token
}

export function verifyToken(token){
    const userData = jsonwebtoken.verify(token,secret)
    return userData;
}