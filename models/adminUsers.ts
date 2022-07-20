import { ObjectId } from "mongodb"

export default class AdminUser {
    public get username(): string {
        return this._username
    }
    public set username(value: string) {
        this._username = value
    }
    public get passwordDigest(): string {
        return this._passwordDigest
    }
    public set passwordDigest(value: string) {
        this._passwordDigest = value
    }
    public get firstName(): string {
        return this._firstName
    }
    public set firstName(value: string) {
        this._firstName = value
    }
    public get lastName(): string {
        return this._lastName
    }
    public set lastName(value: string) {
        this._lastName = value
    }
    constructor(
        private _username: string, 
        private _passwordDigest: string, 
        private _firstName: string, 
        private _lastName: string,
        public id?: ObjectId
        ) {}
}