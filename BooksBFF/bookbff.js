const express = require('express');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const app = express();
const jwt = require('jsonwebtoken');
const axios = require('axios');

const orgHost = process.env.BACKEND_HOST || "localhost";
const orgPort = process.env.BACKEND_PORT || 3001;


// Define a middleware to check the user agent header and JWT token
app.use("/books", (req, res, next) => {
  const userAgent = req.get('User-Agent');
  const authHeader = req.get('Authorization');
  if (!userAgent) {
    res.status(400).send('User-Agent header is missing');
    return;
  }
  if (!authHeader) {
    res.status(401).send('Authorization header is missing');
    return;
  }
  const token = authHeader.split(' ')[1];
  try {
    const decodedToken = jwt.decode(token, { complete: true });
    const payload = decodedToken.payload;
    if (!('sub' in payload) || !('iss' in payload) || !('exp' in payload)) {
      res.status(401).send('Missing claim');
    }
    if (!['starlord', 'gamora', 'drax', 'rocket', 'groot'].includes(payload.sub)) {
      res.status(401).send('Invalid sub claim in the JWT token');
    }
    if (payload.iss !== 'cmu.edu') {
      res.status(401).send('Invalid iss claim in the JWT token');
    }
    if (payload.exp <= Math.floor(Date.now() / 1000)) {
      res.status(401).send('Expired JWT token');
    }
    // req.user = decodedToken;
    next();
  } catch (err) {
    res.status(401).send("Token error: " + err.message);
    return;
  }
});

// Define a catch-all route that forwards the request to the target server
app.all('/books*',jsonParser, async (req, res) => {
  try {
    const BASE_URL = `${req.protocol}://${orgHost}:${orgPort}`;
    const response = await axios({
      method: req.method,
      baseURL: BASE_URL,
      url: req.originalUrl,
      data: req.body
    });


    let responseData = response.data;

    
    // Replace "non-fiction" with 3 for mobile devices
    if (req.get('User-Agent').includes('Mobile') && req.method==='GET') {
      responseData = JSON.stringify(responseData).replace(/"non-fiction"/g, 3);
      responseData = JSON.parse(responseData);
    }

    res.status(response.status).send(responseData);
  } catch (error) {
    console.log(error)
    if (error.response) {
      res.status(error.response.status).send(error.response.data);
    } else {
      res.status(500).send(error.message);
    }
  }
});

//health check
app.get("/", (req, res) => {
  res.status(200).send("Customer BFF OK");
});
app.get("/status", (req, res) => {
  res.send("OK");
});

const PORT = process.env.PORT || 81;

app.listen(PORT, () => {
  console.log(`Book BFF listening on port ${PORT}`);
});