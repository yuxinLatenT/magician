const { json, text } = require('body-parser');
const express = require("express"); // 引入express套件
const cors = require("cors"); //引入cor套件
const app = express();
const PORT = 3000;

app.use(cors());

app.get('/', (req, res) => {
    res.send("server");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// MySQL
const setting = require("./setting.json");
const mysql = require("mysql2");

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

// 從MySQL拿字卡資料放到伺服器
app.get('/words', (req, res) => {
    db.query('SELECT * FROM `words`;', (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(results);
    });
});

// 從MySQL拿玩家分數資料放到伺服器
app.get('/mem_ranking', (req, res) => {
    db.query("SELECT * FROM `mem_ranking`;", (err, results) => {
        if(err){
            res.status(500).send(err);
            return;
        }
        res.json(results);
    })
});

// POST API
app.use(express.json());

// 傳資料到伺服器，再把伺服器上的資料推回去MySQL
app.post('/mem_player_record', (req, res) => {
    const {name, score} = req.body;
    db.query("INSERT INTO mem_player_record (name, score) VALUES (?, ?)", [name, score], (err, result) => {
        if(err){
            res.status(500).send(err);
            return;
        }
        res.send('User added successfully');
    })
});