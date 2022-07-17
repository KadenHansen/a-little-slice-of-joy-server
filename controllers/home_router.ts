// External Dependencies
import express, { Request, Response } from "express"
import { ObjectId } from "mongodb"
import { collections } from "../models/index";
import Service from "../models/services";

// Global Config
export const homeRouter = express.Router()

// GET
homeRouter.get("/services", async (_req: Request, res: Response) => {
    try {
       const service = (await (collections.services!.find({}).toArray()) as any) as Service[]
        res.status(200).send(service)
    } catch (error) {
        res.status(500).send(error)
    }
})

// POST
homeRouter.post("/services", async (req: Request, res: Response) => {
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
// homeRouter.put("/services/:id", async (req: Request, res: Response) => {
//     const id = req?.params?.id;

//     try {
//         const updatedService: Service = req.body as Service;
//         const query = { _id: new ObjectId(id) };
      
//         const result = await collections.services!.updateOne(query, { $set: updatedService });

//         result
//             ? res.status(200).send(`Successfully updated service with id ${id}`)
//             : res.status(304).send(`Service with id: ${id} not updated`);
//     } catch (error) {
//         console.error(error);
//         res.status(400).send(error);
//     }
// })

// DELETE
homeRouter.delete("/services/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;
    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.services!.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed game with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove game with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Game with id ${id} does not exist`);
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
});