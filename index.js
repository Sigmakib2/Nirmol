// Import the Express module
const express = require('express');

// Create an instance of Express
const app = express();

// Define a route for the root URL ("/")
app.get('/', (req, res) => {
  res.send('Hello World!dw'); // Send "Hello World!" as the response
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
