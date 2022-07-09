// DEPENDENCIES
import * as mongoDB from "mongodb"

// GLOBAL VARIABLES
export const collections: { services?: mongoDB.Collection, menu?: mongoDB.Collection } = {}

// INITIALIZE CONNECTION
export async function connectToDatabase () {
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.MONGO_URI!)
    try {
        await client.connect()

    } catch {
        console.log("couldn't connect to db")
    }

    const db: mongoDB.Db = client.db(process.env.DB_Name)
    const servicesCollection: mongoDB.Collection = db.collection(process.env.SERVICES_COLLECTION!)
    const menuCollection: mongoDB.Collection = db.collection(process.env.MENU_COLLECTION!)

    collections.services = servicesCollection
    collections.menu = menuCollection

    console.log(`db: ${db.databaseName} connected and collections: ${servicesCollection.collectionName} & ${menuCollection.collectionName} connected`)

}