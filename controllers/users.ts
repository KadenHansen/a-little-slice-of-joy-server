import express, { Request, Response } from "express"
import { collections } from "../models/index"
import AdminUser from "../models/adminUsers"
import bcrypt from 'bcrypt'
const jwt = require('json-web-token')

// GLOBAL CONFIG
export const userRouter = express.Router()

// POST
// Create new user document and add to users collection
userRouter.post("/admin", async (req: Request, res: Response) => {
    try {
        const { password, ...rest } = req.body
        const newMenuItem = {
            ...rest,
            passwordDigest: await bcrypt.hash(password, 10)
        } as AdminUser
        const result = await collections.adminUsers?.insertOne(newMenuItem)

        result
            ? res.status(201).send("successfully created new admin user!")
            : res.status(500).send("failed to create new admin user")

    } catch (err) {
        console.log(err)
    }
})

// Validate user login information and update current user
userRouter.post('/login', async (req, res) => {
    let user = await collections.adminUsers!.findOne({
        username: req.body.username
    })

    if (!user || !await bcrypt.compare(req.body.password, user.passwordDigest)) {
        res.status(404).json({
            message: 'Could not find a user with the provided username and password'
        })
    } else {
        const result = await jwt.encode(process.env.JWT_Secret, { id: user._id })
        res.json({ currentUser: user, token: result.value })
    }
})