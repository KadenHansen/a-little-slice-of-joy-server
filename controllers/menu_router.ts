// External Dependencies
import express, { Request, Response } from "express"
import { ObjectId } from "mongodb"
import { collections } from "../models/index"
import MenuItem from "../models/menuItem"

// GLOBAL CONFIG
export const menuRouter = express.Router()

// GET
// retrieve one document from services collection by id
menuRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        
        const query = { _id: new ObjectId(id) };
        const service = (await (collections.menu!.findOne(query)) as any) as MenuItem;

        if (service) {
            res.status(200).send(service);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
})

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

// PUT
// edit a document from the services collection by id
menuRouter.put("/:id/edit", async (req: Request, res: Response) => {
    const id = req?.params?.id
    try {
        const updatedMenuItem: MenuItem = req.body as MenuItem;
        const query = { _id: new ObjectId(id) }
        const result = await collections.menu!.updateOne(query, { $set: updatedMenuItem })
        result
            ? res.status(200).send(`Successfully updated menu item with id ${id}`)
            : res.status(304).send(`Menu item with id: ${id} not updated`);
    } catch (error) {
        console.error(error)
        res.status(400).send(error)
    }
})

// DELETE
// delete document from menu collection by id
menuRouter.delete("/:id/delete", async (req: Request, res: Response) => {
    const id = req?.params?.id;
    try {
        const query = { _id: new ObjectId(id) }
        const result = await collections.menu!.deleteOne(query)

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed menu item with id ${id}`)
        } else if (!result) {
            res.status(400).send(`Failed to remove menu item with id ${id}`)
        } else if (!result.deletedCount) {
            res.status(404).send(`Menu item with id ${id} does not exist`)
        }
    } catch (error) {
        console.error(error)
        res.status(400).send(error)
    }
})