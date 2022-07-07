import { ObjectId } from "mongodb"

export default class Service {
    constructor(
        public title: string, 
        public image: URL, 
        public description: string, 
        public id?: ObjectId
        ) {}
}