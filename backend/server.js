require('dotenv').config();
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const mongoose = require('mongoose');
const path = require('path');
const express = require('express');
const { searchQuestions, uploadData } = require('./services/searchService.js');
const uploadRoute = require('./controllers/dataController.js');
const cors = require('cors'); 

const app = express();
app.use(cors()); 

const PROTO_PATH = path.resolve(__dirname, './proto/search.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const searchProto = grpc.loadPackageDefinition(packageDefinition).search;

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true
 })
  .then(() => console.log(" MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

const server = new grpc.Server({
    'grpc.max_receive_message_length': 40 * 1024 * 1024,  // 40MB
    'grpc.max_send_message_length': 40 * 1024 * 1024,    // 40MB
  });
server.addService(searchProto.SearchService.service, { searchQuestions, uploadData });

server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
  console.log('gRPC server running on port 50051');
  server.start();
});

// Express Middleware
app.use(express.json());
app.use('/api', uploadRoute);

// Search endpoint 
app.post('/api/search', (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  // Call gRPC server for search
  const client = new searchProto.SearchService('localhost:50051', grpc.credentials.createInsecure());

  client.SearchQuestions({ query: "the" }, (error, response) => {
    if (!error) {
      console.log('Search Results:');
      response.results.forEach(result => {
        console.log(`\nTitle: ${result.title}`);
  
        // Display MCQ options if type is MCQ
        if (result.type === 'MCQ') {
          console.log('Options:');
          result.options.forEach(option => {
            console.log(`- ${option.text} ${option.isCorrectAnswer ? '(Correct)' : ''}`);
          });
        }
        
        // Display blocks if type is ANAGRAM
        if (result.type === 'ANAGRAM') {
          console.log('Blocks:');
          result.blocks.forEach(block => {
            console.log(`- ${block.text} ${block.isAnswer ? '(Answer)' : ''}`);
          });
        }
      });
    } else {
      console.error('Error searching:', error);
    }
  });
}

);

app.listen(3000, () => console.log(' Express server running on port 3000'));
