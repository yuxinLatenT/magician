const { json, text } = require('body-parser');
const express = require('express'); // 引入express套件
const app = express();
const PORT = 3000;

const setting = require("./setting.json");
const mysql = require("mysql2");

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: setting.mysql_password, //put in json
    database: 'magician_book' 
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

app.get('/users', (req, res) => {
    db.query('SELECT * FROM `words`;', (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(results);
    });
});
