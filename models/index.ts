// DEPENDENCIES
import * as mongoDB from "mongodb"
import * as dotenv from "dotenv"

// GLOBAL VARIABLES
export const collections: { services?: mongoDB.Collection } = {}

// INITIALIZE CONNECTION

export async function connectToDatabase () {
    dotenv.config()
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.MONGO_URI!)
    try {
        await client.connect()

    } catch {
        console.log("couldn't connect to db")
    }

    const db: mongoDB.Db = client.db(process.env.DB_Name)
    const servicesCollection: mongoDB.Collection = db.collection(process.env.SERVICES_COLLECTION!)

    collections.services = servicesCollection

    console.log(`db: ${db.databaseName} connected and collections: ${servicesCollection.collectionName} connected`)

}