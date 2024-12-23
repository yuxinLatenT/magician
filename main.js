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

const c1 = document.getElementById("c1");
c1.innerText = "c1";
const c2 = document.getElementById("c2");
c2.innerText = "c2";
const c3 = document.getElementById("c3");
c3.innerText = "c3";
const c4 = document.getElementById("c4");
c4.innerText = "c4";
const c5 = document.getElementById("c5");
c5.innerText = "c5";
const c6 = document.getElementById("c6");
c6.innerText = "c6";
const c7 = document.getElementById("c7");
c7.innerText = "c7";
const c8 = document.getElementById("c8");
c8.innerText = "c8";
const c9 = document.getElementById("c9");
c9.innerText = "c9";
const c10 = document.getElementById("c10");
c10.innerText = "c10";
const c11 = document.getElementById("c11");
c11.innerText = "c11";
const c12 = document.getElementById("c12");
c12.innerText = "c12";
const c13 = document.getElementById("c13");
c13.innerText = "c13";
const c14 = document.getElementById("c14");
c14.innerText = "c14";
const c15 = document.getElementById("c15");
c15.innerText = "c15";
const c16 = document.getElementById("c16");
c16.innerText = "c16";
const c17 = document.getElementById("c17");
c17.innerText = "c17";
const c18 = document.getElementById("c18");
c18.innerText = "c18";

// 翻卡牌
let click_on_card_n = 0;

const card_box = [[ , ], [ , ]]; // 卡片id 內容id
function card_onclick(element){
    card_box[click_on_card_n][0] = element.id;
    card_box[click_on_card_n][1] = element.innerHTML;

    element.style.border = "4px solid var(--border_c)";
    element.style.color = "var(--text_c)";

    click_on_card_n += 1;

    if(click_on_card_n == 2){
        check_ans();
        click_on_card_n = 0;
    }
}

// 檢查答案
function check_ans(){
    // if correct
    //   hide_card()

    // else
    //   element.style.border = "border: 2px solid var(--yellow1)";
}

// 配對成功，把卡變不見
function hide_card(){
    const x = document.getElementById(card_box[0][0]);
    const y = document.getElementById(card_box[1][0]);
    // 不能用remove位置會跑掉，改成invisible
    x.style.visibility = "hidden";
    y.style.visibility = "hidden";
}

function delete_card_buffer(){

}


// 遊戲是否開始以及行動
const mem_start = document.getElementById("mem_start_btn");
let input_player_name = document.getElementById("input_player_name");

mem_start.addEventListener("click", function(){
    let introduction = document.getElementById("intro");
    introduction.remove();

    // 玩家名字等資料丟到sql
    
    // console.log(input_player_name.value);
    save_game_result(input_player_name.value, 87); //玩家名字存到mysql
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
const cd_min = 0.2;
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
