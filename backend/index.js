import express from 'express';
import multer from 'multer';
import path from 'path'
import cors from 'cors';
import { route } from './routes/login.js';
import { userData } from './routes/login.js';
import { run } from './db.js';
import { RankingRoute } from './routes/ranking.js';
import {toggleUploadedFile, checkUploadedFile} from './utils/setUploadedFile.js'
import { FramesRoute } from './routes/frames.js';

const app = express()
const port = 3000;
const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your frontend URL (e.g., Vite/React)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  };
  
app.use(cors(corsOptions)); // Apply CORS with options

run().then(() => {
    
    app.use(express.json());
    app.use('/frames', FramesRoute)
    app.use('/users', route);

}).catch(err => console.log('Error', err))




const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null,  `${userData.firstName}-${userData.secondName}` + path.extname(file.originalname));
    }
})

const upload = multer({storage: storage})

app.post('/upload', upload.single('file'), (req, res) => {
    toggleUploadedFile();
    res.json({message: 'File uploaded successfuly', fileName: req.file.filename})
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})

app.use('/ranking', checkUploadedFile, RankingRoute)
