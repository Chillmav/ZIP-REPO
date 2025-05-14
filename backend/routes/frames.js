import { framesCollection } from "../db.js";
import express from "express";

let userData = {};

export const FramesRoute = express.Router();

FramesRoute.get("/", async (req, res) => {

    try {

        userData.Shape = await framesCollection.distinct("shape");
        userData.Color = await framesCollection.distinct("color");
        userData.Type = await framesCollection.distinct("type");
        userData.Mark = await framesCollection.distinct("mark");

        res.json(userData);

    } catch (error) {

        throw new error;

    }

})

