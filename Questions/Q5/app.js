// npm install express multer
const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// Set storage engine and filename format using multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// File upload limits and file format validation
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 }, // 1MB file size limit
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('textFile'); // single file with field name 'textFile'

// Function to check file type (only text files allowed)
function checkFileType(file, cb) {
    const filetypes = /txt/; // allowed file extensions
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = file.mimetype === 'text/plain';

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Only .txt files are allowed!');
    }
}

// Serve static files from the 'views' directory
app.use(express.static('views'));

// Home route to display the form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});


// Route to handle file upload
app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).send(err);
        } else {
            if (!req.file) {
                return res.status(400).send('Error: No file selected');
            } else {
                return res.send(`File uploaded successfully! <br> File name: ${req.file.filename}`);
            }
        }
    });
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
