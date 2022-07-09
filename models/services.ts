import { ObjectId } from "mongodb"

export default class Service {
    public get description(): string {
        return this._description;
    }
    public set description(value: string) {
        this._description = value;
    }
    public get image(): URL {
        return this._image;
    }
    public set image(value: URL) {
        this._image = value;
    }
    public get title(): string {
        return this._title;
    }
    public set title(value: string) {
        this._title = value;
    }
    constructor(
        private _title: string, 
        private _image: URL, 
        private _description: string, 
        public id?: ObjectId
        ) {}
}