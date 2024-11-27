import express from 'express'
import { databaseConfig } from './config/databaseConfig.js'
import { expressConfig } from './config/expressConfig.js'

import routes from './config/routes.js'

const app = express()

databaseConfig()
expressConfig(app)


app.use(routes)

app.listen(3000, console.log('Server is listening on post http://localhost:3000'))