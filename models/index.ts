// DEPENDENCIES
import * as mongoDB from "mongodb"

// GLOBAL VARIABLES
export const collections: {
    adminUsers?: mongoDB.Collection, services?: mongoDB.Collection, menu?: mongoDB.Collection 
} = {}

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
    const adminUsersCollection: mongoDB.Collection = db.collection(process.env.ADMIN_COLLECTION!)

    collections.services = servicesCollection
    collections.menu = menuCollection
    collections.adminUsers = adminUsersCollection

    console.log(`db: ${db.databaseName} connected and collections: ${servicesCollection.collectionName} & ${menuCollection.collectionName} connected`)

}