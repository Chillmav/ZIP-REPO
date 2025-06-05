import express from 'express';
import { spawn } from 'child_process';

export const RecommendRoute = express.Router();

RecommendRoute.post('/', (req, res) => {

    const preferences = req.body
    const py = spawn('python3', ['model/bin/fit_frames_prediction.py']);

    res.json({
      message: 'done',
      preferences: preferences
    });

})

