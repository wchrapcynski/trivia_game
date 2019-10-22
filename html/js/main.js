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
const message = document.querySelector('.message')

// Arrays
let answerText = [answer1, answer2, answer3, answer4];

// Boolean variables
let gameOver = true;
let questionAnswered = false;

// Variables
let currentQuestionNum = 1;
let maxQuestions = questions.length;
let score = 0;

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
    shuffle(questions);
    totalQ.innerText = maxQuestions;
    score = 0;
    menu1.addEventListener('click', startGame);
    playerScore.innerText = score;
    currentQuestionNum = 1;
}
gameReset();

function grabQuestion() {
    choicesActivate()
    questionBox.innerText = "Question #" + currentQuestionNum + " - " + (questions[currentQuestionNum - 1].question);
    shuffle(questions[currentQuestionNum - 1].choices)
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
    menu1.innerText = "Next Question";
    grabQuestion();
    choicesActivate();
}

function choicesActivate() {
    for(let i = 0; i < 4; i++) {
        answerText[i].addEventListener('click', checkAnswer);
    }
}

function choicesDeactivate() {
    for (let i = 0; i < 4; i++) {
        answerText[i].removeEventListener('click', checkAnswer);
    }
}

function checkAnswer() {
    if (this.innerText === questions[currentQuestionNum - 1].answer) {
        message.innerText = "Correct!";
        score += 1;
        playerScore.innerText = score;
    } else {
        message.innerText = "Incorrect!";
    }
    if (currentQuestionNum === questions.length) {
        message.innerText = "The game is over!"
        gameOver = true;
        menu1.innerText = "Start New Game";
        menu1.classList.remove("greyedOut")
        menu1.removeEventListener('click', grabQuestion)
        menu1.addEventListener('click', startGame)
    }
    choicesDeactivate()
    currentQuestionNum += 1;
    menu1.classList.remove("greyedOut")
    menu1.addEventListener('click', grabQuestion)
}