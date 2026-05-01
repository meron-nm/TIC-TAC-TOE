let cell = document.querySelectorAll(".cell");
let turn = "X";
let gameOver = false;
let turnbox = document.getElementById("turnbox")
let mode = "pvp"; // 👈 IMPORTANT (adds game mode)

let scoreBox = document.getElementById("scoreBox");
let xScore = 0;
let oScore = 0;
let popup = document.getElementById("popup");
let popupText = document.getElementById("popupText");
let playAgain = document.getElementById("playAgain");
let wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

document.getElementById("pvp").onclick = () => {
    mode = "pvp";
};

document.getElementById("ai").onclick = () => {
    mode = "ai";
};


function createConfetti() {
    for (let i = 0; i < 100; i++) {
        let confetti = document.createElement("div");
        confetti.classList.add("confetti");

        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.backgroundColor =
            ['green', 'white'][Math.floor(Math.random() * 2)];

        document.body.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 2000);
    }
}

cell.forEach((i) => {
    i.onclick = () => {
        if (mode === "ai" && !gameOver) {

    setTimeout(() => {

        if (turn === "O") {

            let empty = [];

            cell.forEach((c, index) => {
                if (c.textContent === "") {
                    empty.push(index);
                }
            });

            if (empty.length === 0) return;

            let move = empty[Math.floor(Math.random() * empty.length)];

            cell[move].click(); // AI plays

        }

    }, 300);
}

        if (gameOver) return;

        if (i.textContent !== "") {
            return;
        }

        i.textContent = turn;
        i.classList.add("pop");

        // remove it after animation so it can replay next time
        setTimeout(() => {
            i.classList.remove("pop");
        }, 400);

        if (turn === "X") {
            turn = "O";
        } else {
            turn = "X";
        }

        turnbox.innerHTML = "Turn: " + turn;

        // ✅ FIXED WIN LOGIC (removed invalid if{ )
        for (let x = 0; x < wins.length; x++) {

            let a = cell[wins[x][0]].textContent;
            let b = cell[wins[x][1]].textContent;
            let c = cell[wins[x][2]].textContent;

            if (a !== "" && a === b && b === c) {
                // document.getElementById("messagebox").innerHTML = a + " WINS";
                popup.classList.remove("hidden");
popupText.innerHTML = a + " WINS 🎉";
                createConfetti();
                // cell[wins[x][0]].style.backgroundColor = "lightgreen";
                // cell[wins[x][1]].style.backgroundColor = "lightgreen";
                // cell[wins[x][2]].style.backgroundColor = "lightgreen";
                cell[wins[x][0]].classList.add("win");
                cell[wins[x][1]].classList.add("win");
                cell[wins[x][2]].classList.add("win");






                // update score
                if (a === "X") {
                    xScore++;
                } else {
                    oScore++;
                }
                scoreBox.innerHTML = "X: " + xScore + " | O: " + oScore;

 gameOver = true;
                document.getElementById("board").classList.add("disabled");
               
                break;
            }
        }

        // DRAW CHECK
        if (
            cell[0].textContent !== "" &&
            cell[1].textContent !== "" &&
            cell[2].textContent !== "" &&
            cell[3].textContent !== "" &&
            cell[4].textContent !== "" &&
            cell[5].textContent !== "" &&
            cell[6].textContent !== "" &&
            cell[7].textContent !== "" &&
            cell[8].textContent !== ""
        ) {
            // document.getElementById("messagebox").innerHTML = "DRAW";
            popup.classList.remove("hidden");
popupText.innerHTML = "DRAW 🤝";
           gameOver = true;
            document.getElementById("board").classList.add("disabled");
            
        }

    };
});
playAgain.onclick = () => {

    cell.forEach(i => {
        i.textContent = "";
        i.classList.remove("win");
        i.style.backgroundColor = "";
    });

    turn = "X";
    gameOver = false;

    document.getElementById("messagebox").innerHTML = "";
    turnbox.innerHTML = "Turn: X";

    document.getElementById("board").classList.remove("disabled");

    popup.classList.add("hidden");
};

document.getElementById("reset-btn").onclick = () => {
    cell.forEach(i => {
        i.textContent = "";
        i.style.backgroundColor = ""
        i.classList.remove("win")
    });


    // ✅ FIXED RESET STATE
    gameOver = false;
    turn = "X";
    turnbox.innerHTML = "Turn: X"

    document.getElementById("messagebox").innerHTML = "";
    document.getElementById("board").classList.remove("disabled");
};

// if (
//   // ROWS
//   (cell[0].textContent === cell[1].textContent &&
//    cell[1].textContent === cell[2].textContent &&
//    cell[0].textContent !== "") ||

//   (cell[3].textContent === cell[4].textContent &&
//    cell[4].textContent === cell[5].textContent &&
//    cell[3].textContent !== "") ||

//   (cell[6].textContent === cell[7].textContent &&
//    cell[7].textContent === cell[8].textContent &&
//    cell[6].textContent !== "") ||

//   // COLUMNS
//   (cell[0].textContent === cell[3].textContent &&
//    cell[3].textContent === cell[6].textContent &&
//    cell[0].textContent !== "") ||

//   (cell[1].textContent === cell[4].textContent &&
//    cell[4].textContent === cell[7].textContent &&
//    cell[1].textContent !== "") ||

//   (cell[2].textContent === cell[5].textContent &&
//    cell[5].textContent === cell[8].textContent &&
//    cell[2].textContent !== "") ||

//   // DIAGONALS
//   (cell[0].textContent === cell[4].textContent &&
//    cell[4].textContent === cell[8].textContent &&
//    cell[0].textContent !== "") ||

//   (cell[2].textContent === cell[4].textContent &&
//    cell[4].textContent === cell[6].textContent &&
//    cell[2].textContent !== "")
// ) {
//   console.log("congratulations");
//   gameover=true;
// }