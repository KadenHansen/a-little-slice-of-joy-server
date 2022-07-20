import express, { Request, Response } from "express"
import { collections } from "../models/index"
import AdminUser from "../models/adminUsers"
import bcrypt from 'bcrypt'

// GLOBAL CONFIG
export const userRouter = express.Router()

// POST
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