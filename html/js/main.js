// DOM variables
const questionBox = document.querySelector('.questionBox');
const menu1 = document.querySelector('.menu1');
const answer1 = document.querySelector('.answer1');
const answer2 = document.querySelector('.answer2');
const answer3 = document.querySelector('.answer3');
const answer4 = document.querySelector('.answer4');
const infobox = document.querySelector('.menuBox');
const playerScore = document.querySelector('#playerScore');
const totalQ = document.querySelector('#totalQ');
const message = document.querySelector('.message');
const flashing = document.querySelector('.forFlashing');
// Arrays
let answerText = [answer1, answer2, answer3, answer4];

// Boolean variables
let gameOver = true;
let questionAnswered = false;

// Variables
let currentQuestionNum = 1;
let maxQuestions = questions.length;
let score = 0;

// Game logic

// Fisher-Yates Shuffle
function shuffle(array) {
    var counter = array.length;
    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        var temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}

// Game reset
function gameReset() {
    menu1.classList.add('flashingGreen');
    shuffle(questions);
    totalQ.innerText = maxQuestions;
    score = 0;
    menu1.addEventListener('click', startGame);
    playerScore.innerText = score;
    currentQuestionNum = 1;
}
gameReset();

function grabQuestion() {
    flashing.classList.remove('flashingGreen');
    flashing.classList.remove('flashingRed');
    choicesActivate();
    questionBox.innerText = "Question #" + currentQuestionNum + " - " + (questions[currentQuestionNum - 1].question);
    shuffle(questions[currentQuestionNum - 1].choices);
    for(let i = 0; i < 4; i++) {
        answerText[i].innerText = questions[currentQuestionNum - 1].choices[i];
    }
    menu1.classList.add("greyedOut")
    menu1.removeEventListener('click', grabQuestion)
    menu1.removeEventListener('click', startGame);
}

function startGame () {
    gameReset();
    gameOver = false;
    menu1.innerText = "Next";
    grabQuestion();
    choicesActivate();
    showWhiteText(questionBox);
    menu1.classList.remove('flashingGreen');
}

function checkAnswer() {
    if (this.innerText === questions[currentQuestionNum - 1].answer) {
        flashing.classList.add('flashingGreen');
        flashing.style.display = 'none';
        flashing.style.display = 'inline';
        flashing.innerText = "That's\nRight!";
        questionBox.innerText = "";
        showCorrect();
        score += 1;
        playerScore.innerText = score;
    } else {
        flashing.classList.add('flashingRed');
        flashing.innerText = "That's\nwrong.";
        questionBox.innerText = "";
        showIncorrect();
    }
    if (currentQuestionNum === questions.length) {
        flashing.innerText = "Game Over!"
        gameOver = true;
        menu1.innerText = "Start New Game";
        menu1.classList.add('flashingGreen');
        menu1.classList.remove("greyedOut");
        menu1.removeEventListener('click', grabQuestion);
        menu1.addEventListener('click', startGame);
        questionBox.innerText = "Your final score is " + score + " out of " + maxQuestions + ".";
        for (let i = 0; i < 4; i++) {
            answerText[i].innerText = "";
        }
        flashing.classList.remove('flashingGreen');
        flashing.classList.remove('flashingRed');
        showWhiteText(questionBox);
        return;
    }
    choicesDeactivate()
    currentQuestionNum += 1;
    menu1.classList.remove("greyedOut")
    menu1.addEventListener('click', grabQuestion)
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
        flashing.innerText = "Pick\none!"
        showWhiteText(questionBox);
    }
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
}

function showCorrect() {
    let right = document.createElement("img");
    questionBox.appendChild(right);
    right.setAttribute("src", "images/right.png");
}

function showIncorrect() {
    let right = document.createElement("img");
    questionBox.appendChild(right);
    right.setAttribute("src", "images/wrong.png");
}