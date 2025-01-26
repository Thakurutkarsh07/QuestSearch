const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const fs = require('fs');
const path = require('path');

const PROTO_PATH = path.resolve(__dirname, '../proto/search.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const searchProto = grpc.loadPackageDefinition(packageDefinition).search;

const client = new searchProto.SearchService('localhost:50051', grpc.credentials.createInsecure(), {
  'grpc.max_receive_message_length': 40 * 1024 * 1024,  // 40MB
  'grpc.max_send_message_length': 40 * 1024 * 1024,    // 40MB
});

// Function to upload data from a JSON file
fs.readFile(path.resolve(__dirname, 'speakx_questions.json'), 'utf8', async (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  try {
    const questionsData = JSON.parse(data);
    console.log(`Uploading ${questionsData.length} questions...`);

    client.UploadData({ data: questionsData }, (error, response) => {
      if (!error) {
        console.log(`Uploaded ${response.uploadedCount} questions successfully.`);
      } else {
        console.error('Error uploading data:', error.details || error.message);
      }
    });
  } catch (error) {
    console.error('Error parsing JSON:', error);
  }
});

// Search example
client.SearchQuestions({ query: "Rearrange" }, (error, response) => {
  if (!error) {
    console.log(`Found ${response.results.length} matching questions.`);
    console.table(response.results);
  } else {
    console.error('Error searching:', error.details || error.message);
  }
});
