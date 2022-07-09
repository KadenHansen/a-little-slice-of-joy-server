// External Dependencies
import express, { Request, Response } from "express"
import { ObjectId } from "mongodb"
import { collections } from "../models/index"
import MenuItem from "../models/menuItem"

// GLOBAL CONFIG
export const menuRouter = express.Router()

// GET
menuRouter.get("/", async (_req: Request, res: Response) => {
    try {
       const menuItem = (await (collections.menu!.find({}).toArray()) as any) as MenuItem[]
        res.status(200).send(menuItem)
    } catch (error) {
        res.status(500).send(error)
    }
})

// POST
menuRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newMenuItem = req.body as MenuItem
        const result = await collections.menu?.insertOne(newMenuItem)

        result
            ? res.status(201).send("successfully created new menu item!")
            : res.status(500).send("failed to create new menu item")

    } catch (err) {
        console.log(err)
    }
})
