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

// 從MySQL拿玩家排名資料放到伺服器
app.get('/mem_ranking', (req, res) => {
    db.query("SELECT * FROM `mem_ranking`;", (err, results) => {
        if(err){
            res.status(500).send(err);
            return;
        }
        res.json(results);
    });
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
    });
});

// 檢查排名和決定要不要更新
app.post('/mem_ranking', (req, res) => {
    const {name, score} = req.body;
    db.query("SELECT * FROM `mem_ranking`;", (err, results) => {
        if(err){
            res.status(500).send(err);
            return;
        }
        let result = results;

        let rank = 5;
        for(let i=4; i>=0; i--){ // 逐一和排行榜比較
            if(score > result[i].score){
                rank = i;
            }
        }

        if(rank != 5){ // 要更新排行榜
            for(let i=4; i>=rank; i--){
                if(i == rank){ // 新的資料
                    update_ranking(name, score, i+1);
                }
                else{
                    update_ranking(result[i-1].name, result[i-1].score, i+1);
                }
            }
        }
    });
    
});

// 更新排行榜
function update_ranking(name_this, score_this, id_this){
    console.log(name_this, score_this, id_this);
    db.query("UPDATE `mem_ranking` SET `name` = ?, `score` = ? WHERE `id` = ?", 
            [name_this, score_this, id_this], (err, result) => {
        if(err){
            console.log(err);
            return;
        }
        console.log("update successfully");
    });
}