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

// Event listeners
if(menu1.innerText === "Start Game") {
    menu1.addEventListener('click', startGame);
}

// Arrays
let answerText = [answer1, answer2, answer3, answer4];

// Boolean variables
let gameOver = true;
let questionAnswered = false;

// Variables
let currentQuestionNum = 1;
let maxQuestions = 20;

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
}
gameReset();

function grabQuestion() {
    questionBox.innerText = "Question #" + currentQuestionNum + " - " + (questions[currentQuestionNum - 1].question);
    for(let i = 0; i < 4; i++) {
        answerText[i].innerText = questions[currentQuestionNum - 1].choices[i];
    }
}

function startGame () {
    gameOver = false;

}