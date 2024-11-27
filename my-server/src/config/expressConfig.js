import express from 'express'
import { session } from '../utils/session.js'
import { secret } from '../constanst.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'

export function expressConfig(app) {  
    app.use(cookieParser(secret));  
    app.use(session());
   
    app.use('/styles', express.static('src/styles'))
    app.use(cors())
    app.use(express.json())
}