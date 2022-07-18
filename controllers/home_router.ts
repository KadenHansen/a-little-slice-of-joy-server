// External Dependencies
import express, { Request, Response } from "express"
import { ObjectId } from "mongodb"
import { collections } from "../models/index";
import Service from "../models/services";

// Global Config
export const homeRouter = express.Router()

// GET
// retrieve one document from services collection by id
homeRouter.get("/services/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        
        const query = { _id: new ObjectId(id) };
        const service = (await (collections.services!.findOne(query)) as any) as Service;

        if (service) {
            res.status(200).send(service);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
})

// retrieve all documents from services collection
homeRouter.get("/services", async (_req: Request, res: Response) => {
    try {
       const service = (await (collections.services!.find({}).toArray()) as any) as Service[]
        res.status(200).send(service)
    } catch (error) {
        res.status(500).send(error)
    }
})

// POST
// add a document to services collection
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
// edit a document from the services collection by id
homeRouter.put("/services/:id/edit", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedService: Service = req.body as Service;
        const query = { _id: new ObjectId(id) };
      
        const result = await collections.services!.updateOne(query, { $set: updatedService });
        result
            ? res.status(200).send(`Successfully updated service with id ${id}`)
            : res.status(304).send(`Service with id: ${id} not updated`);
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
})

// DELETE
// delete document from services collection by id
homeRouter.delete("/services/:id/delete", async (req: Request, res: Response) => {
    const id = req?.params?.id;
    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.services!.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed service with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove service with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Service with id ${id} does not exist`);
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
});