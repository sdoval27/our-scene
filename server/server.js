const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const multer = require('multer');
const path = require('path');
const { authMiddleware } = require ('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), (req, res) => {
  // File has been uploaded and can be accessed via req.file
  res.sendStatus(200); // Send a success response
});

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

const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });


  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Ise GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
};

startApolloServer();