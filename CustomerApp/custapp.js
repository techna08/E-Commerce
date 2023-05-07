const express = require('express');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const app = express();
const mysql = require('mysql');
const custController = require('./controllers/custController');

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
app.get("/status", (req, res) => {
  res.send("OK");
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Cust Server listening on port ${PORT}`);
});