import express from 'express';
import multer from 'multer';
import path from 'path'
import { randomUUID } from 'crypto';
const app = express()
const port = 3000;

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null,  randomUUID() + path.extname(file.originalname));
    }
})

const upload = multer({storage: storage})

app.post('/uploads', upload.single('file'), (req, res) => {
    console.log(req.file)
    res.json({message: 'File uploaded successfuly', fileName: req.file.filename})
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})