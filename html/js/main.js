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
}
gameReset();

function grabQuestion() {
    questionBox.innerText = "Question #" + currentQuestionNum + " - " + (questions[currentQuestionNum - 1].question);
    shuffle(questions[currentQuestionNum - 1].choices)
    for(let i = 0; i < 4; i++) {
        answerText[i].innerText = questions[currentQuestionNum - 1].choices[i];
    }
    menu1.classList.add("greyedOut")
    menu1.removeEventListener('click', startGame);
}

function startGame () {
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

function checkAnswer() {
    console.log(this.innerText)
    console.log(questions[currentQuestionNum - 1].answer)
    if (this.innerText === questions[currentQuestionNum - 1].answer) {
        console.log("This is correct!")
        score += 1;
        playerScore.innerText = score;
    } else {
        console.log("This is not correct!")
    }
    if (currentQuestionNum === questions.length) {
        console.log("The game is over!");
        return 0;
    }
    currentQuestionNum += 1;
    menu1.classList.remove("greyedOut")
    menu1.addEventListener('click', grabQuestion)
}