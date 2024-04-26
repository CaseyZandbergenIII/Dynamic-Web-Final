// Import mysql2 module for db interaction
const db = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

// Create connection to database
const conn = db.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASSWORD,
    database: "Restaurant"
});

// Establish connection to database
conn.connect(error => {
    if(error) throw error;
    
    console.log("Connection Successful!");
});

// Export connection
module.exports = conn;