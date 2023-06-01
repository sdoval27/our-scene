// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const app = express();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'Images');
//   },
//   filename: (req, file, cb) => {
//     console.log(file);
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });


// const upload = multer({ storage: storage});

// app.set('view engine', 'ejs');

// app.get('/upload', (req, res) => {
//   res.render(__dirname + '/index.html');
// });

// app.post('/upload', upload.single('image'), (req, res) => {
//   // Access the uploaded file using req.file
//   res.send("Image uploaded");
// });

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });