import express from 'express'
import compress from 'compression'
import parser from 'body-parser'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import authHandler from './middlewares/authHandler.js'
import requestTimer from './middlewares/timeIt.js'
import errorHandler from './middlewares/errorHandler.js'

const Base = require('clay-base-sdk')
const app = express()

Base.init(process.env.BASE_SECRET_KEY)

app.use(compress())
app.use(helmet())
app.use(cookieParser())

app.use(parser.json({ limit: '50mb' }))
app.use(parser.urlencoded({ limit: '50mb', extended: false }))

app.use(morgan('dev'))

import apiRoutes from './routes/index.js'
app.use('/v1/*', cors())
app.use('/v1/*', requestTimer)
app.use('/v1/*', authHandler)
app.use('/v1/', apiRoutes)

app.use('/assets', express.static(__dirname + '/build-front'));
app.use(express.static(__dirname + '/build-front'));

app.use((req, res, next) => {
    res.sendFile(__dirname + '/build-front/index.html');
})

app.use(errorHandler)

var port = process.env.PORT || 3001;
app.listen(port);
console.log('[Base App Started] API listening at ' + port);