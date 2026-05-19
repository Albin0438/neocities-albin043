const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to read input data from your HTML forms
app.use(express.urlencoded({ extended: true }));

// This forces Express to go up one level out of the 'js' folder to find your HTML and CSS files
app.use(express.static(path.join(__dirname, '../')));

// Automatically creates 'project_database.db' right inside your VS Code folder
const db = new sqlite3.Database('./project_database.db', (err) => {
    if (err) {
        console.error("Database connection failed:", err.message);
    } else {
        console.log("SQLite database file created/connected successfully.");
        // Setup table structure
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )`);
    }
});

// ROUTE: Handles New Account Registration
app.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10); // Encrypt password safely

        const query = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
        db.run(query, [username, email, hashedPassword], (err) => {
            if (err) {
                return res.send(`<script>alert("Error: Username/Email already exists!"); window.history.back();</script>`);
            }
            res.send(`<script>alert("Registration Successful!"); window.location.href = "/login.html";</script>`);
        });
    } catch {
        res.status(500).send("Server Error");
    }
});

// ROUTE: Handles User Login Verification
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const query = `SELECT * FROM users WHERE username = ?`;
    db.get(query, [username], async (err, user) => {
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.send(`<script>alert("❌ Incorrect details!"); window.history.back();</script>`);
        }
        res.send(`<script>alert("✅ Welcome back, ${username}!"); window.location.href = "/";</script>`);
    });
});

app.listen(PORT, () => console.log(`Your site is live at http://localhost:${PORT}`));