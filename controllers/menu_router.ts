// External Dependencies
import express, { Request, Response } from "express"
import { ObjectId } from "mongodb"
import { collections } from "../models/index";
import MenuItem from "../models/menuItem";

// GLOBAL CONFIG
export const menuRouter = express.Router()

// GET

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
