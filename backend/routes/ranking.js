import express from "express";
import { framesCollection } from "../db.js";
import { toggleUploadedFile } from "../utils/setUploadedFile.js";
export const RankingRoute = express.Router();

RankingRoute.get('/', async (req, res) => {
    try {
        toggleUploadedFile();
        const frames = await framesCollection.find().toArray();
        res.json(frames);
    } catch (err) {
        console.log('Error fetching frames', err)
        throw err
    }
    
})