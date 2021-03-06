import { ObjectId } from "mongodb"

export default class MenuItem {
    public get category(): string {
        return this._category;
    }
    public set category(value: string) {
        this._category = value;
    }
    public get imageDescription(): string {
        return this._imageDescription;
    }
    public set imageDescription(value: string) {
        this._imageDescription = value;
    }
    public get itemName(): string {
        return this._itemName;
    }
    public set itemName(value: string) {
        this._itemName = value;
    }
    public get image(): URL {
        return this._image;
    }
    public set image(value: URL) {
        this._image = value;
    }
    constructor(
        private _itemName: string, 
        private _image: URL, 
        private _imageDescription: string, 
        private _category: string,
        public id?: ObjectId
        ) {}
}