// External Dependencies
import express, { Request, Response } from "express"
import { ObjectId } from "mongodb"
import { collections } from "../models/index";
import Service from "../models/services";

// Global Config
export const homeRouter = express.Router()

// GET

// POST
homeRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newService = req.body as Service
        const result = await collections.services?.insertOne(newService)

        result
            ? res.status(201).send("successfully created new service!")
            : res.status(500).send("failed to create new service")

    } catch (err) {
        console.log(err)
    }
})

// PUT

// DELETE