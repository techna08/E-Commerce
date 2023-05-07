
const kafka = require("../controllers/kafka");
const addCustomer = (req,res,connection) => {
    const { userId, name, phone, address, address2, city, state, zipcode } = req.body;

// Validate request body
if (!userId || !name || !phone || !address || !city || !state || !zipcode) {
return res.status(400).json({ message: "Missing input fields" });
}

if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(userId)) {
return res.status(400).json({ message: "Invalid email address" });
}
const stateAbbreviations = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];
if (!stateAbbreviations.includes(state.toUpperCase())) {
return res.status(400).json({ message: "Invalid state abbreviation" });
}

// Check if user already exists
connection.query("SELECT * FROM customer WHERE userId=?", [userId], (err, results) => {
if (err) {
console.error(err);
return res.status(500).json({ message: "Internal server error" });
}
else if (results.length > 0) {
return res.status(422).json({ message: "This user ID already exists in the system." });
}
else{
    // Generate unique numeric ID for the new customer
const customerId = Math.floor(Math.random() * 1000000) + 1;

// Insert new customer into database
connection.query(
  "INSERT INTO customer (id, userId, name, phone, address, address2, city, state, zipcode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
  [customerId, userId, name, phone, address, address2, city, state, zipcode],
  (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.setHeader("Location", `/customers/${customerId}`);
    //let is publish to kafka before we send a response.
    const customerData = {
      "customerId": customerId,
      "userId": userId,
      "name": name,
      "phone": phone,
      "address": address,
      "address2": address2,
      "city": city,
      "state": state,
      "zipcode": zipcode
  };
  
    kafka.publish(customerData);
    res.status(201).json({
      id: customerId,
      userId,
      name,
      phone,
      address,
      address2,
      city,
      state,
      zipcode,
    });
  }
);
}
});


   
}

const getCustByUserId =  (req,res,connection) => {
    var userId = req.query.userId;
    userId=userId.replace("%","@")

    if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(userId)) {
      return res.status(400).json({ message: "Invalid email address" });
      }
    if (!userId || !userId.includes('@')) {
      res.status(400).json({ message: 'Illegal, missing, or malformed input' });
      return;
    }
  
    const encodedUserId = encodeURIComponent(userId);
    const sql = 'SELECT * FROM customer WHERE userId = ?';
  
    connection.query(sql, [userId], (error, results, fields) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      } else if (results.length === 0) {
        res.status(404).json({ message: 'User-ID does not exist in the system' });
      } else {
        const customerData = results[0];
        res.status(200).json(customerData);
      }
    });

}
const getCustById =  (req,res,connection) => {
    const id = req.params.ID;

    if(!id || isNaN(id)){
        res.status(400).json({ message: 'Illegal, missing, or malformed input' });
        return;
    }

    const sql = 'SELECT * FROM customer WHERE id = ?';
  
    connection.query(sql, [id], (error, results, fields) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      } else if (results.length === 0) {
        res.status(404).json({ message: 'ID does not exist in the system' });
      } else {
        const customerData = results[0];
        res.status(200).json(customerData);
      }
    });

}
module.exports = {
    addCustomer,
    getCustByUserId,
    getCustById,
  };