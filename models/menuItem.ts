import { ObjectId } from "mongodb"

export default class MenuItem {
    constructor(
        public itemName: string, 
        public image: URL, 
        public imageDescription: string, 
        public id?: ObjectId
        ) {}
}