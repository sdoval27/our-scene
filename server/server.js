const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const multer = require('multer');
const path = require('path');
const { authMiddleware } = require ('./utils/auth');
 //const cors = require('cors');
 const http = require('http');
const socketIO = require('socket.io');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
 //app.use(cors()); // Enable CORS for all routes
const httpServer = http.createServer(app);


// const io = socketIO(httpServer, {
//   cors: {
//     origin: "http://localhost:3001",
//     methods: ["GET", "POST"]
//   }
// });

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//----Multer Middleware for Image Uploading
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Images');
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage});

app.set('view engine', 'ejs');

app.get('/upload', (req, res) => {
  res.render(__dirname + '/index.html');
});

app.post('/upload', upload.single('image'), (req, res) => {
  // Access the uploaded file using req.file
  res.send("Image uploaded");
});
//----End of Multer Middleware

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Add the following error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

// io.on('connection', (socket) => {
//   console.log(`A user connected: ${socket.id}`);

//   socket.on('message', (data) => {
//     console.log('Received message:', data);
//     // Handle the received message
//   });

//   socket.on('disconnect', () => {
//     console.log(`User disconnected: ${socket.id}`);
//   });
// });

const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  


  db.once('open', () => {
    httpServer.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
};

startApolloServer();
