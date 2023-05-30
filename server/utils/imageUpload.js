const express = require('express');
const multer = require('multer');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), (req, res) => {
  // Access the uploaded file using req.file
  console.log(req.file);

  // Process the file and respond to the request
  res.json({ message: 'File uploaded successfully' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});