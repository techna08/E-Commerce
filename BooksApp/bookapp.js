const express = require('express');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const app = express();
const mysql = require('mysql');
const bookController = require('./controllers/booksController');

const connection = mysql.createConnection({
    
    // host: "localhost",
    // port: "3306",
    // user: "root",
    // password: "Ipad@1212",
    // database: "BookStore",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    
  });
  


connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL database:', err.message);
      return;
    }
  
    console.log('Connected to MySQL database');
  });

  //Book Controllers
  app.post('/books',jsonParser,(req,res) => {
    bookController.addBook(req,res,connection)
  });

  app.put('/books/:ISBN', jsonParser, (req, res) => {
    bookController.updateBook(req, res, connection);
  });

  app.get('/books/:ISBN', (req, res) => {
    bookController.retrieveBook(req,res,connection)
  });
  app.get('/books/isbn/:ISBN', (req, res) => {
    bookController.retrieveBook(req,res,connection)
  });

  app.get('/books/:ISBN/related-books',(req,res) => {
    bookController.relatedBooks(req,res,connection)
  });

  app.get("/status", (req, res) => {
    res.send("OK");
  });
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`BookApp listening on port ${PORT}`);
});