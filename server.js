const { json, text } = require('body-parser');
const express = require("express"); // 引入express套件
const cors = require("cors"); //引入cor套件
const app = express();
const PORT = 3000;

const setting = require("./setting.json");
const mysql = require("mysql2");

app.use(cors());

app.get('/', (req, res) => {
    res.send("server");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: setting.mysql_password, // 放在setting.json裡面
    database: 'magician_book' 
});

// 連線到MySQL
db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// GET API
app.get('/words', (req, res) => {
    db.query('SELECT * FROM `words`;', (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(results);
    });
});

// POST API
app.use(express.json());

app.post('/mem_player_record', (req, res) => {
    const {name, score} = req.body;
    db.query("INSERT INTO mem_player_record (name, score) VALUES (?, ?)", [name, score], (err, result) => {
        if(err){
            res.status(500).send(err);
            return;
        }
        res.send('User added successfully');
    })
})