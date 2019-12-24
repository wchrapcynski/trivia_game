// DOM variables
const questionBox = document.querySelector('.question-box');
const control = document.querySelector('.control');
const answer1 = document.querySelector('.answer1');
const answer2 = document.querySelector('.answer2');
const answer3 = document.querySelector('.answer3');
const answer4 = document.querySelector('.answer4');
const infobox = document.querySelector('.menu-box');
const scoreText = document.querySelector('.score');
const message = document.querySelector('.message');
const flashing = document.querySelector('.for-flashing');
// Arrays
let answerText = [answer1, answer2, answer3, answer4];
let answerArr = ["answer1", "answer2", "answer3", "answer4"];

// Boolean variables
let gameOver = true;
let questionAnswered = false;

// Variables
let currentQuestionNum = 1;
let maxQuestions = questions.length;
let score = 0;
let highScore = 0;

// Game logic

// Fisher-Yates Shuffle
function shuffle(array) {
    let counter = array.length;
    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}

// Game reset
function gameReset() {
    control.classList.add('flashing-green');
    shuffle(questions);
    score = 0;
    control.addEventListener('click', startGame);
    scoreText.innerText = "Score:\n" + score + " / " + maxQuestions;
    currentQuestionNum = 1;
    retrieveHighScore();
    showHighScore();
}
gameReset();

// Pulls a random question from the pool
function grabQuestion() {
    removeHighlightPickedAnswer();
    flashing.classList.remove('flashing-green');
    flashing.classList.remove('flashing-red');
    choicesActivate();
    questionBox.innerText = "Question #" + currentQuestionNum + " - " + (questions[currentQuestionNum - 1].question);
    shuffle(questions[currentQuestionNum - 1].choices);
    for(let i = 0; i < 4; i++) {
        answerText[i].innerText = questions[currentQuestionNum - 1].choices[i];
    }
    control.classList.add("greyed-out")
    control.removeEventListener("click", grabQuestion);
    control.removeEventListener("click", startGame);
}

// Runs at the beginning of the game
function startGame () {
    gameReset();
    gameOver = false;
    control.innerText = "Next";
    grabQuestion();
    choicesActivate();
    showWhiteText(questionBox);
    control.classList.remove("flashing-green");
}

// Checks to see if the correct answer is picked
function checkAnswer() {
    for (let i = 0; i < 4; i++) {
        if (this.classList[i] !== answerArr[i]) {
            answerText[i].classList.add('greyed-out');
        }
    }
    this.classList.add('yellow');
    if (this.innerText === questions[currentQuestionNum - 1].answer) {
        rightAnswer();
    } else {
        wrongAnswer();
    }
    if (currentQuestionNum === questions.length) {
        return gameOver();
    }
    control.classList.remove("greyed-out");
    endofTurn();

    function endofTurn() {
        choicesDeactivate();
        currentQuestionNum += 1;
        control.addEventListener("click", grabQuestion);
    }

    function gameOver() {
        gameOver = true;
        flashing.innerText = "Game Over!";
        control.innerText = "New Game";
        control.classList.add("flashing-green");
        control.removeEventListener("click", grabQuestion);
        control.addEventListener("click", startGame);
        questionBox.innerText = "Your final score is " + score + " out of " + maxQuestions + ".";
        for (let i = 0; i < 4; i++) {
            answerText[i].innerText = "";
        }
        flashing.classList.remove('flashing-green');
        flashing.classList.remove('flashing-red');
        showWhiteText(questionBox);
        checkIfHighScore()
        showHighScore()
        return;
    }

    function wrongAnswer() {
        flashing.classList.add('flashing-red');
        flashing.innerText = "That's wrong";
        questionBox.innerText = "";
        showIncorrect();
    }

    function rightAnswer() {
        flashing.classList.add('flashing-green');
        flashing.style.display = 'none';
        flashing.style.display = 'inline';
        flashing.innerText = "That's Right!";
        questionBox.innerText = "";
        showCorrect();
        score += 1;
        scoreText.innerText = "Score:\n" + score + " / " + maxQuestions;
    }
}

// DOM functions
function hideWhiteText(element) {
    element.classList.remove("white");
    element.classList.add("hide");
}

function showWhiteText(element) {
    element.classList.add("white");
    element.classList.remove("hide");
}

function choicesActivate() {
    for (let i = 0; i < 4; i++) {
        answerText[i].addEventListener('click', checkAnswer);
        showWhiteText(questionBox);
    }
    flashing.innerText = "Pick one!"
}

function choicesDeactivate() {
    for (let i = 0; i < 4; i++) {
        answerText[i].removeEventListener('click', checkAnswer);
        hideWhiteText(questionBox);
    }
}

function showCorrect() {
    let right = document.createElement("img");
    questionBox.appendChild(right);
    right.setAttribute("src", "images/right.png");
    right.setAttribute("class", "right-wrong");
}

function showIncorrect() {
    let right = document.createElement("img");
    questionBox.appendChild(right);
    right.setAttribute("src", "images/wrong.png")
    right.setAttribute("class", "right-wrong");
}

function removeHighlightPickedAnswer() {
    for (let i = 0; i < 4; i++) {
        answerText[i].classList.remove('greyed-out');
        answerText[i].classList.remove('yellow');
    }
}

function saveHighScore() {
    localStorage.setItem("highscore", score);
}

function retrieveHighScore() {
    highScore = localStorage.getItem("highscore")
}

function deleteHighScore() {
    localStorage.removeItem("highscore");
}

function checkIfHighScore() {
    if (score > highScore) {
        highScore = score;
        answer2.classList.add('yellow');
        answer2.innerText = "You got the high score!"
        deleteHighScore();
        saveHighScore();
    }
}

function showHighScore() {
    if (highScore === null) {
        highScore = 0;
    }
    answer1.classList.add('yellow');
    answer1.innerText = "The current high score is " + highScore + " / " + maxQuestions;
}