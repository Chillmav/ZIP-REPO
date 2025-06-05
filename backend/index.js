import express from 'express';
import multer from 'multer';
import path from 'path'
import cors from 'cors';
import { run } from './db.js';
import { RecommendRoute } from './routes/recommend.js';
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
app.use(express.json())
run().then(() => {
    
    app.use(express.json());
    app.use('/frames', FramesRoute)

    app.use((err, req, res, next) => {
    console.error('Error middleware caught:', err);
    res.status(500).json({ error: 'Internal Server Error' });
    });

}).catch(err => console.log('Error', err))





const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null,  `file` + path.extname(file.originalname));
    }
})

const upload = multer({storage: storage})

app.post('/upload', upload.single('file'), (req, res) => {
  try {
    
    const userData = JSON.parse(req.body.userData);
    const uploadedFile = req.file;
    toggleUploadedFile();
    
    res.json({
      message: 'Upload successful',
      userData,
      fileName: uploadedFile.filename
    });
  } catch (error) {
    console.error('Upload route error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
  
});


app.use('/recommend', RecommendRoute);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})

