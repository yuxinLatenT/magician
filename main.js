function home_btn_onclick(element){
    window.location = ""; //首頁連結
}

function github_btn_onclick(element){
    window.location = "https://github.com/yuxinLatenT/magician";
}

// function mem_card_onclick(element){
//     window.location.href = "memory_card.html";
//     alert("hi");

// }

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