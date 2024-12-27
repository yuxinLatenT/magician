// here
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
set_q_of_rounds();

let round = 0;

// 出該場次的題目和設定答案
let q_in_this_round = [];
let questions = [];
let answers = [];

function set_questions(){
    console.log("set_questions()");
    q_in_this_round = [];
    questions = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],
                 [0,0],[0,0],[0,0],[0,0],[0,0],[0,0],
                 [0,0],[0,0],[0,0],[0,0],[0,0],[0,0],];

    answers = [0,0,0,0,0,0,
               0,0,0,0,0,0,
               0,0,0,0,0,0];

    for(let i=9*round; i<9*(round+1); i++){
        q_in_this_round.push(questions_of_rounds[i]);
        q_in_this_round.push(questions_of_rounds[i]);
    }
    console.log(q_in_this_round);
    
    for(let i=0; i<18; i++){
        // i = 0 2 4 6 放平假名
        let index = Math.floor(Math.random() * 18);
        if(questions[index][0] == 0){
            questions[index][0] = q_in_this_round[i];
            questions[index][1] = i % 2;
        }
        else{
            i -= 1;
        }
    }
    console.log(questions);

    for(let i=0; i<18-1; i++){
        let target = questions[i][0];
        for(let j=i+1; j<18; j++){
            if(questions[j][0] == target){
                answers[i] = j;
                answers[j] = i;
                break;
            }
        }
    }
    console.log(answers);
    
    c1.classList.remove("hidee");
    c2.classList.remove("hidee");
    c3.classList.remove("hidee");
    c4.classList.remove("hidee");
    c5.classList.remove("hidee");
    c6.classList.remove("hidee");
    c7.classList.remove("hidee");
    c8.classList.remove("hidee");
    c9.classList.remove("hidee");
    c10.classList.remove("hidee");
    c11.classList.remove("hidee");
    c12.classList.remove("hidee");
    c13.classList.remove("hidee");
    c14.classList.remove("hidee");
    c15.classList.remove("hidee");
    c16.classList.remove("hidee");
    c17.classList.remove("hidee");
    c18.classList.remove("hidee");
}
set_questions(); //move

// 翻卡牌
let click_on_card_n = 0;

let card_box = [[ , ], [ , ]]; // 卡片id 內容id
function card_onclick(element){
    card_box[click_on_card_n][0] = element.id;
    card_box[click_on_card_n][1] = element.innerText;
    console.log(card_box[click_on_card_n]);
    
    element.classList.add("click");
    
    click_on_card_n += 1;
    
    if(click_on_card_n == 2){
        //check_ans(); 會造成css來不及改
        console.log(card_box);
        setTimeout(check_ans, 400); 
    }
}

// 檢查答案
let score = 0;
let correct = 1;

function check_ans(){
    console.log("check_ans()");
    
    let position_1_str = card_box[0][0]; // cxx
    let position_2_str = card_box[1][0]; // cyy
    // 只取id的數字部分
    let position_1 = position_1_str.slice(1); // xx
    let position_2 = position_2_str.slice(1); // yy
    // console.log(position_1, position_2);
    // console.log(answers[position_1-1], position_2-1);
    
    if(answers[position_1-1] == position_2-1){
        correct = 1;
    }
    else{
        correct = 0;
    }

    if(correct == 1){
        score += 1;
        update_score();
        hide_card();
    }
    else{
        back_card();
    }
    click_on_card_n = 0;
}

const player_s = document.getElementById("player_s");

function update_score(){
    player_s.innerHTML = score;
}

// 配對成功，把卡變不見
function hide_card(){
    console.log("hide_card()");
    const x = document.getElementById(card_box[0][0]);
    const y = document.getElementById(card_box[1][0]);
    x.classList.remove("click");
    y.classList.remove("click");
    // 不能用remove位置會跑掉，改成hidden
    x.classList.add("hidee");
    y.classList.add("hidee");
    console.log("correct and score = ", score);
    if(score%9 == 0 && score != 0){ // 這輪的牌翻完了
        console.log("next");
        round += 1;
        setTimeout(() => {
            set_questions();
            fetch_cards();
        }, 500);
        
    }
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


mem_start.addEventListener("click", function(){
    let introduction = document.getElementById("intro");
    introduction.remove();

    interval = setInterval(update_counter, 1000);

    document.body.classList.add("mem_game_start");
});



// 計時器
const cd_min = 0.1;
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

// 遊戲結束
const input_player_name = document.getElementById("input_player_name");

function game_end() {
    save_game_result(input_player_name.value, score);
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
    //window.location.replace(location.href); // 重新載入網頁再玩一次
    window.location.href = "memory_card.html";
});

const server_PORT = 3000;

// 取得字卡資料
async function fetch_cards() {
    //const response = await fetch('http://localhost:3000/words');
    const response = await fetch(`http://localhost:${server_PORT}/words`);
    const words = await response.json();

    function set_card_text(card_id, card_index){
        // console.log("q is ",questions[card_index]);
        // console.log(words[questions[card_index][0]-1]);
        // console.log(words[questions[card_index][0]-1].Romanization);
        // console.log(words[questions[card_index][0]-1].hiragana);
        
        if(questions[card_index][1] == 0){
            card_id.innerText = words[questions[card_index][0]-1].hiragana;
            // console.log("use hiragana");
        }
        else{
            card_id.innerText = words[questions[card_index][0]-1].Romanization;
            // console.log("use Romanization");
        }
    }
    set_card_text(c1, 0);
    set_card_text(c2, 1);
    set_card_text(c3, 2);
    set_card_text(c4, 3);
    set_card_text(c5, 4);
    set_card_text(c6, 5);
    set_card_text(c7, 6);
    set_card_text(c8, 7);
    set_card_text(c9, 8);
    set_card_text(c10, 9);
    set_card_text(c11, 10);
    set_card_text(c12, 11);
    set_card_text(c13, 12);
    set_card_text(c14, 13);
    set_card_text(c15, 14);
    set_card_text(c16, 15);
    set_card_text(c17, 16);
    set_card_text(c18, 17);
}
fetch_cards();

// 存遊玩結果-玩家名字、更新分數
async function save_game_result(player_name, player_score) {
    await fetch(`http://localhost:${server_PORT}/mem_player_record`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: player_name, score: player_score })
    });
}

// // test
// fetch('http://localhost:3000/words')
//     .then(response => response.json())
//     .then(data => console.log('Words data:', data))
//     .catch(error => console.error('Error fetching words:', error));
