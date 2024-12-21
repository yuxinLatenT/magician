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

// 遊戲是否開始以及行動
const mem_start = document.getElementById("mem_start_btn");
let input_player_name = document.getElementById("input_player_name");

mem_start.addEventListener("click", function(){
    let introduction = document.getElementById("intro");
    introduction.remove();

    // 玩家名字、現在時間等資料丟到sql
    
    console.log(input_player_name.value); //玩家名字

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
        document.body.classList.remove();
        document.body.classList.add();
    }
    cd_time -= 1;
}

// 取得字卡資料
async function fetchCards() {
    const response = await fetch('http://localhost:3000/words');
    const words = await response.json();
    console.log(words);
    // 根據資料生成 HTML 卡片
}
fetchCards();

// 存遊玩結果
async function saveGameResult(player_name, player_score) {
    await fetch('http://localhost:3000/mem_player_record', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: player_name, score: player_score })
    });
    alert('Game result saved!');
}


// // test
// fetch('http://localhost:3000/words')
//     .then(response => response.json())
//     .then(data => console.log('Words data:', data))
//     .catch(error => console.error('Error fetching words:', error));
