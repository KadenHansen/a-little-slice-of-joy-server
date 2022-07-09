// DEPENDENCIES
import express from 'express'
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
import { connectToDatabase } from './models/index'
import { homeRouter } from './controllers/home_router'
import { menuRouter } from './controllers/menu_router'

// CONFIGURATIONS & MIDDLEWARE
require('dotenv').config()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

// ROOT
app.get('/', (_req, res) => {
        res.json('A Little Slice of Joy homepage stub')
    })

// LISTEN
let port = (process.env.PORT as any) as number 
if (port == null || !port) {
    port = 8000
}

connectToDatabase()
    .then(() => {
        app.use("/", homeRouter)
        app.use("/gallery", menuRouter)

        app.listen(port, () => {
            console.log(`server started att http://localhost:${port}`)
        })
    })