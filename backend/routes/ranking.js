import express from "express";
import { framesCollection } from "../db.js";
export const RankingRoute = express.Router();

RankingRoute.get('/', async (req, res) => {
    try {
        const frames = await framesCollection.find().toArray();
        res.json(frames);
    } catch (err) {
        console.log('Error fetching frames', err)
        throw err
    }
    
})