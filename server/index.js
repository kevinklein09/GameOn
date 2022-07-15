const path = require('path');
const express = require('express');
const port = 3000;
const distPath = path.resolve(__dirname, '..', 'dist');
const app = express();
const DB = require('../DB/index.js');
// Middleware - every request runs thru this middleware

app.use(express.json()); // Parse the request body
app.use(express.urlencoded({ extended: true })); // Parses url
app.use(express.static(distPath)); // Statically serve up client directory




/** Place all code above here */
app.listen(port, () => {
  console.log(`
  Listening at: http://127.0.0.1:${port}
  `);
});