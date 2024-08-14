let gameSeq = [];
let userSeq = [];
let btns = ["red", "yellow", "blue", "green"];

let start = false;
let level = 0;

let subHeading = document.querySelector("h2");
let allBtns = document.querySelectorAll(".btn");

document.addEventListener("keypress", startGame);
document.addEventListener("click", (e) => {
    if (!e.target.classList.contains("btn")) {
        startGame();
    }
});

function startGame() {
    if (!start) {
        start = true;
        levelUp();
    }
}

function levelUp() {
    userSeq = [];
    level++;
    subHeading.innerText = `Level ${level}`;
    let randIndex = Math.floor(Math.random() * 4);
    let randColor = btns[randIndex];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    btnFlash(randBtn);
}

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 300);
}

for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function btnPress() {
    let btn = this;
    btnFlash(btn);
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns();
}

function checkAns() {
    if (userSeq[userSeq.length - 1] !== gameSeq[userSeq.length - 1]) {
        subHeading.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key or tap to Start.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "#201E43";
        }, 200);
        reset();
    } else if (userSeq.length === gameSeq.length) {
        setTimeout(levelUp, 1000);
    }
}

function reset() {
    start = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
