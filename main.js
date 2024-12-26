function home_btn_onclick(element){
    window.location = "index.html"; //首頁連結
}

function github_btn_onclick(element){
    window.location = "https://github.com/yuxinLatenT/magician";
}

function mem_card_onclick(element){
    window.location.href = "memory_card.html";
}

function type_text_onclick(element){
    window.location.href = "type_text.html";
}

document.body.classList.remove("mem_game_start");
document.body.classList.remove("mem_game_end");
document.body.classList.remove("card_click");

const c1 = document.getElementById("c1");
const c2 = document.getElementById("c2");
const c3 = document.getElementById("c3");
const c4 = document.getElementById("c4");
const c5 = document.getElementById("c5");
const c6 = document.getElementById("c6");
const c7 = document.getElementById("c7");
const c8 = document.getElementById("c8");
const c9 = document.getElementById("c9");
const c10 = document.getElementById("c10");
const c11 = document.getElementById("c11");
const c12 = document.getElementById("c12");
const c13 = document.getElementById("c13");
const c14 = document.getElementById("c14");
const c15 = document.getElementById("c15");
const c16 = document.getElementById("c16");
const c17 = document.getElementById("c17");
const c18 = document.getElementById("c18");

// 卡片出現場次的順序
let questions_of_rounds = [];

function set_q_of_rounds(){
    for(let i=0; i<45; i++){ // 出45題
        let n = Math.floor(Math.random() * 46) + 1; //產生1~46的整數
        if(questions_of_rounds.includes(n)){
            i -= 1;
        }
        else{
            questions_of_rounds.push(n);
        }
    }
    console.log(questions_of_rounds);
}
set_q_of_rounds(); //move


let round = 0;

// 出該場次的題目
let q_in_this_round = [];
let questions = [0,0,0,0,0,0,
                 0,0,0,0,0,0,
                 0,0,0,0,0,0]

let answers = [0,0,0,0,0,0,
               0,0,0,0,0,0,
               0,0,0,0,0,0]


function set_questions(){
    for(let i=9*round; i<9*(round+1); i++){
        q_in_this_round.push(questions_of_rounds[i]);
        q_in_this_round.push(questions_of_rounds[i]);
    }
    console.log(q_in_this_round);
    
    for(let i=0; i<18; i++){
        let index = Math.floor(Math.random() * 18);
        if(questions[index] == 0){
            questions[index] = q_in_this_round[i];
        }
        else{
            i -= 1;
        }
    }
    console.log(questions);

    for(let i=0; i<18-1; i++){
        let target = questions[i];
        for(let j=i+1; j<18; j++){
            if(questions[j] == target){
                answers[i] = j;
                answers[j] = i;
            }
        }
    }
    console.log(answers);

    c1.innerText = questions[0];
    c2.innerText = questions[1];
    c3.innerText = questions[2];
    c4.innerText = questions[3];
    c5.innerText = questions[4];
    c6.innerText = questions[5];
    c7.innerText = questions[6];
    c8.innerText = questions[7];
    c9.innerText = questions[8];
    c10.innerText = questions[9];
    c11.innerText = questions[10];
    c12.innerText =questions[11];
    c13.innerText = questions[12];
    c14.innerText = questions[13];
    c15.innerText = questions[14];
    c16.innerText = questions[15];
    c17.innerText = questions[16];
    c18.innerText = questions[17];
}
set_questions(); //move

// 翻卡牌
let click_on_card_n = 0;

const card_box = [[ , ], [ , ]]; // 卡片id 內容id
function card_onclick(element){
    card_box[click_on_card_n][0] = element.id;
    card_box[click_on_card_n][1] = element.innerText;

    element.classList.add("click");
    
    click_on_card_n += 1;

    if(click_on_card_n == 2){
        //check_ans(); 會造成css來不及改
        setTimeout(check_ans, 400); 
    }
    // if(score%9 == 0 && score != 0){ // 這輪的牌翻完了
    //     round += 1;
    //     set_questions();
    // }
    console.log(score);
}



// 檢查答案
let score = 0;
let correct = 1;
function check_ans(){
    console.log("check_ans()");




    if(correct == 1){
        hide_card();
        score += 1;
        correct = 0;
    }
    else{
        back_card();
        correct = 1;
    }

    click_on_card_n = 0;
}



// 配對成功，把卡變不見
function hide_card(){
    console.log("hide_card()");
    const x = document.getElementById(card_box[0][0]);
    const y = document.getElementById(card_box[1][0]);
    // 不能用remove位置會跑掉，改成invisible
    x.style.visibility = "hidden";
    y.style.visibility = "hidden";
}

// 配對錯了，蓋回去
function back_card(){
    console.log("back_card()");
    const x = document.getElementById(card_box[0][0]);
    const y = document.getElementById(card_box[1][0]);
    x.classList.remove("click");
    y.classList.remove("click");
}

// 遊戲是否開始以及行動
const mem_start = document.getElementById("mem_start_btn");
let input_player_name = document.getElementById("input_player_name");
// let player_name = input_player_name.value;

mem_start.addEventListener("click", function(){
    let introduction = document.getElementById("intro");
    introduction.remove();

    // 玩家名字等資料丟到sql
    
    // console.log(input_player_name.value);
    save_game_result(input_player_name.value, 0); //玩家名字存到mysql
    interval = setInterval(update_counter, 1000);

    document.body.classList.add("mem_game_start");
});

// 黑暗模式設定
const darkmode_toggle = document.getElementById("darkmode_toggle");

darkmode_toggle.addEventListener("change", function(){
    if(this.checked){
        document.body.classList.add("dark_mode");
    }
    else{
        document.body.classList.remove("dark_mode");
    }
});

// 計時器
const cd_min = 2;
let cd_time = cd_min * 60;
let interval;
const counter = document.getElementById("counter");

function update_counter(){
    counter.innerHTML = cd_time;
    
    if(cd_time==0){
        clearInterval(interval); //停止計時
        game_end();
    }
    cd_time -= 1;
}

function game_end() {
    document.body.classList.remove("mem_game_start"); //元素要不要出現
    document.body.classList.add("mem_game_end");
    c1.remove();
    c2.remove();
    c3.remove();
    c4.remove();
    c5.remove();
    c6.remove();
    c7.remove();
    c8.remove();
    c9.remove();
    c10.remove();
    c11.remove();
    c12.remove();
    c13.remove();
    c14.remove();
    c15.remove();
    c16.remove();
    c17.remove();
    c18.remove();
}

const again_btn = document.getElementById("again_btn");
again_btn.addEventListener("click", function(){
    window.location.replace(location.href); // 重新載入網頁再玩一次
});


// 取得字卡資料
// async function fetchCards() {
//     const response = await fetch('http://localhost:3000/words');
//     const words = await response.json();
//     // 根據資料生成 HTML 卡片
// }
// fetchCards();

// 存遊玩結果
async function save_game_result(player_name, player_score) {
    await fetch('http://localhost:3000/mem_player_record', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: player_name, score: player_score })
    });
    // alert('Game result saved!');
}


// // test
// fetch('http://localhost:3000/words')
//     .then(response => response.json())
//     .then(data => console.log('Words data:', data))
//     .catch(error => console.error('Error fetching words:', error));
