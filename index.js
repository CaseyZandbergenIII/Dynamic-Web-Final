// Import necessary modules
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");

// Create express app
const app = express();

// Declare port
const PORT = 3000;

// Database connection
const conn = require('./models/db');

// Middleware to serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());

// Start Sever
app.listen(PORT, ()=> {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Route for home page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/html/index.html"));
});

// Route for booking a reservation
app.get("/book", (req, res) => {
    res.sendFile(path.join(__dirname, "public/html/make_reservation.html"));
});

// Insert reservation data into db and display confirmation
app.post("/book", (req, res) => {
    const {firstName, lastName, partySize, date, time} = req.body;
    const query = "INSERT INTO reservations (first_name, last_name, party_size, date, time) VALUES (?, ?, ?, ?, ?)";

    conn.query(query, [firstName, lastName, partySize, date, time], (error, results) => {
        if(error) throw error;
        // Redirect to an html page with formatted confirmation of reservation
        res.sendFile(path.join(__dirname, "public/html/made_reservation.html"));
    });
});

// Route for showing today's reservations
app.get("/show", (req, res) => {
    const query = "SELECT id, first_name, last_name, party_size, date, time FROM reservations WHERE date = CURDATE();";

    conn.query(query, (error, results) => {
        if (error) throw error;

        // Read show_reservations html file
        fs.readFile(path.join(__dirname, "public/html/show_reservations.html"), "utf8", (err, template) => {
            if (err) throw err;

            // Replace the placeholder with today's reservation data
            let tableRows = "";
            results.forEach(result => {
                tableRows += "<tr>";
                tableRows += "<td>" + result.id + "</td>";
                tableRows += "<td>" + result.first_name + "</td>";
                tableRows += "<td>" + result.last_name + "</td>";
                tableRows += "<td>" + result.party_size + "</td>";
                tableRows += "<td>" + result.date + "</td>";
                tableRows += "<td>" + result.time + "</td>";
                tableRows += "</tr>";
            });

            // Insert reservation data into the template
            const htmlResponse = template.replace("<!-- Reservation data will be inserted here -->", tableRows);

            // Display today's reservations
            res.send(htmlResponse);
        });
    });
});

// Route for changing reservations
app.get("/change", (req, res) => {
    res.sendFile(path.join(__dirname, "public/html/change_reservation.html"));
});

// Update changed reservations in db and display confirmation
app.post("/change", (req, res) => {
    const { firstName, lastName, partySize, date, time, id } = req.body;
    const query = "UPDATE reservations SET first_name = ?, last_name = ?, party_size = ?, date = ?, time = ? WHERE id = ?";

    conn.query(query, [firstName, lastName, partySize, date, time, id], (error, results) => {
        if (error) throw error;

        // Check if any rows were affected by the update
        if (results.affectedRows === 0) {
            // If no rows were affected, the reservation with the provided ID was not found
            return res.sendFile(path.join(__dirname, "public/html/no_results.html"));
        }

        // Redirect to an HTML page displaying formatted confirmation
        res.sendFile(path.join(__dirname, "public/html/changed_reservation.html"));
    });
});