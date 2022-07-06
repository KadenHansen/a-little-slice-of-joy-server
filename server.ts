// DEPENDENCIES
import express from 'express'
const app = express()

// CONFIGURATIONS & MIDDLEWARE
require('dotenv').config()
app.use(express.json())

// ROOT
app.get('/', (_req, res) => {
        res.json('A Little Slice of Joy homepage stub')
    })

// LISTEN
let port = (process.env.PORT as any) as number 
if (port == null || !port) {
    port = 8000
}
app.listen(port)