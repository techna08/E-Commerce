const express = require('express');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const app = express();
const mysql = require('mysql');
const bookController = require('./controllers/booksController');
const custController = require('./controllers/custController');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    //host: "localhost",
    port: process.env.DB_PORT,
    //port: "3306",
    user: process.env.DB_USER,
    //user: "root",
    password: process.env.DB_PASSWORD,
    //password: "Ipad@1212",
    database: process.env.DB_DATABASE,
    //database: "BookStore",
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

//Customer Controllers

app.post('/customers',jsonParser,(req,res) => {
  custController.addCustomer(req,res,connection)
})

app.get('/customers', (req, res) => {
  custController.getCustByUserId(req,res,connection)
})

app.get('/customers/:ID',(req,res) => {
  custController.getCustById(req,res,connection)
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});