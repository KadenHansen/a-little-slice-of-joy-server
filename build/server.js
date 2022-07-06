"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// DEPENDENCIES
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
// CONFIGURATIONS & MIDDLEWARE
require('dotenv').config();
app.use(express_1.default.json());
// ROOT
app.get('/', (_req, res) => {
    res.json('A Little Slice of Joy homepage stub');
});
// LISTEN
let port = process.env.PORT;
if (port == null || !port) {
    port = 8000;
}
app.listen(port);
