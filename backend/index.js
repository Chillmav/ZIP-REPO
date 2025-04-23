import express from 'express';
import multer from 'multer';
import path from 'path'
import cors from 'cors';
import { route } from './routes/login.js';
import { userData } from './routes/login.js';

const app = express()
const port = 3000;

app.use(cors())
app.use(express.json());
app.use('/users', route);

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
    res.json({message: 'File uploaded successfuly', fileName: req.file.filename})
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})