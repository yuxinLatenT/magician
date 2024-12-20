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

mem_start.addEventListener("click", function(){
    let introduction = document.getElementById("intro");
    introduction.remove();

    // 玩家名字、現在時間等資料丟到sql

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
let stop_cd = 0;
const counter = document.getElementById("counter");

let interval = setInterval(update_counter, 1000);

function update_counter(){
    counter.innerHTML = cd_time;
    
    if(cd_time==0){
        clearInterval(interval); //停止計時
    }
    cd_time -= 1;
}