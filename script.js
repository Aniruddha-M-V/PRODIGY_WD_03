let btnRef = document.querySelectorAll('.button-option');
let popupRef = document.querySelector('.popup');
let newGameBtn = document.querySelector('.newgame');
let restartBtn = document.querySelector('.restart');
let msgRef = document.getElementById('message');
let toggleRef = document.querySelector('.toggle'); // Reference to the player turn display
let xTurn=true;
let winningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [2, 5, 8],
    [6, 7, 8],
    [3, 4, 5],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6],
];

let count = 0;

const disableButtons = () => {
    btnRef.forEach((element) => (element.disabled = true));
    popupRef.classList.remove("hide");
    toggleRef.classList.add("hide"); // Hide the turn display
};

const enableButtons = () => {
    btnRef.forEach((element) => {
        element.innerText = "";
        element.disabled = false;
    });
    popupRef.classList.add("hide");
    toggleRef.classList.remove("hide"); // Show the turn display
    if(xTurn==true)
    {
        toggleRef.innerText = "X TURN"; // Reset to X turn
    }
    else{
        toggleRef.innerText = "O TURN"; 
    }
};

const winFunction = (letter) => {
    disableButtons();
    if (letter == "X") {
        toggleRef.style.visibility = "hidden";
        msgRef.innerHTML = "&#x1F389;<br>X wins!";
        turn(false);
    } else {
        toggleRef.style.visibility = "hidden";
        msgRef.innerHTML = "&#x1F389;<br>O wins!";
    }
};

const drawFunction = () => {
    disableButtons();
    toggleRef.style.visibility = "hidden";
    msgRef.innerHTML = "&#x1F60E;<br>It's a Draw";
};

newGameBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
    toggleRef.style.visibility = "visible"
    if(xTurn==true)
    {
        toggleRef.innerText = "X TURN"; // Reset to X turn
    }
    else
    {
        toggleRef.innerText = "O TURN"; 
    }
});

restartBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
    toggleRef.style.visibility = "visible";   
});

const winChecker = () => {
    for (let i of winningPattern) {
        let [element1, element2, element3] = [
            btnRef[i[0]].innerText,
            btnRef[i[1]].innerText,
            btnRef[i[2]].innerText,
        ];
        if (element1 != "" && element2 != "" && element3 != "") {
            if (element1 == element2 && element2 == element3) {
                winFunction(element1);
                if(element1=="X"){
                    return false;
                }
                else{
                    return true;
                }
            }
        }
    }
    return false;
};

btnRef.forEach((element) => {
    element.addEventListener("click", () => {
        if (xTurn) {
            xTurn = false;
            element.innerText = "X";
            element.disabled = true;
            toggleRef.innerText = "O TURN"; // Show O's turn
        } else {
            xTurn = true;
            element.innerText = "O";
            element.disabled = true;
            toggleRef.innerText = "X TURN"; // Show X's turn
        }
        count++;
        if (count === 9) {
            drawFunction();
        }
        if (!winChecker() && count < 9) {
            toggleRef.classList.remove("hide"); // Ensure turn display is visible
        }
    });
});

// Set initial state on page load
window.onload = () => {
    enableButtons();
    toggleRef.style.visibility = "visible";
};
