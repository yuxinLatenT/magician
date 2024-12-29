const t1 = document.getElementById("top1");
const t2 = document.getElementById("top2");
const t3 = document.getElementById("top3");
const t4 = document.getElementById("top4");
const t5 = document.getElementById("top5");

const server_PORT = 3000;

async function fetch_rankings(){
    const response = await fetch(`http://localhost:${server_PORT}/mem_ranking`);
    const rankings = await response.json();
    
    t1.innerHTML = `TOP 1 ${rankings[0].name} || SCORE  ${rankings[0].score}`;
    t2.innerHTML = `TOP 2 ${rankings[1].name} || SCORE  ${rankings[1].score}`;
    t3.innerHTML = `TOP 3 ${rankings[2].name} || SCORE  ${rankings[2].score}`;
    t4.innerHTML = `TOP 4 ${rankings[3].name} || SCORE  ${rankings[3].score}`;
    t5.innerHTML = `TOP 5 ${rankings[4].name} || SCORE  ${rankings[4].score}`;
}
fetch_rankings();