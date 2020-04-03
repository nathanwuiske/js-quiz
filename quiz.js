const questionContainer = document.getElementById("question-container");
const startContainer = document.getElementById("start-container");
const footerContainer = document.getElementById("footer-container");
const codeContainer = document.getElementById("code-container");

const questionTitle = document.getElementById("question-title");
const questionNumber = document.getElementById("question-number");

const questionFooterNumber = document.getElementById("question-footer-number");
const totalQuestions = document.getElementById("total-questions");
const outOfQuestions = document.getElementById("out-of-questions");

const answerListContainer = document.getElementById("lists");

const quizEndContainer = document.getElementById("quiz-end");

const score = document.getElementById("score");
const finalScore = document.getElementById("final-score");

const startBtn = document.getElementById("start-btn");
startBtn.addEventListener("click", startQuiz);

let currentQuestionNumber = 1;
let currentQuestionIndex = 0;
let currentScore = 0;
let completedBeforeTimer = false;

function restartQuiz() {
  completedBeforeTimer = false;
  currentQuestionNumber = 1;
  currentQuestionIndex = 0;
  currentScore = 0;
  score.innerText = currentScore;
  quizEndContainer.classList.toggle("hide");
  startContainer.classList.toggle("hide");
  startQuiz();
}

let timer;
function startTimer() {
  var presentTime = document.getElementById("timer").innerHTML;
  var timeArray = presentTime.split(/[:]+/);
  var m = timeArray[0];
  var s = checkSecond(timeArray[1] - 1);
  if (s == 59) {
    m = m - 1;
  }

  document.getElementById("timer").innerHTML = m + ":" + s;
  if (m == 0 && s == 0 && !completedBeforeTimer) {
    // If time runs out, end the quiz
    endQuiz();
  } else {
    timer = setTimeout(startTimer, 1000);
  }
}

function checkSecond(sec) {
  if (sec < 10 && sec >= 0) {
    sec = "0" + sec;
  }
  if (sec < 0) {
    sec = "59";
  }
  return sec;
}

function startQuiz() {
  questionContainer.classList.toggle("hide");
  startContainer.classList.toggle("hide");
  footerContainer.classList.toggle("hide");
  totalQuestions.innerText = questions.length;
  setQuestion();
  document.getElementById("timer").innerHTML = 000 + ":" + 50;
  startTimer();
}

function reset() {
  while (answerListContainer.firstChild) {
    answerListContainer.removeChild(answerListContainer.firstChild);
  }
}

function setQuestion() {
  reset();

  questionTitle.innerHTML = questions[currentQuestionIndex].question;
  questionNumber.innerHTML = currentQuestionNumber;
  if (questions[currentQuestionIndex].codeQuestion) {
    codeContainer.style.display = "block";
    codeContainer.innerHTML = questions[currentQuestionIndex].code;
  } else {
    codeContainer.innerHTML = "";
    codeContainer.style.display = "none";
  }

  const answerList = document.createElement("ul");
  questions[currentQuestionIndex].answers.forEach(answer => {
    let item = document.createElement("li");
    item.appendChild(document.createTextNode(answer.text));
    answerList.appendChild(item);
    item.setAttribute("data-answer", answer.correct);
    item.addEventListener("click", selectAnswer);
  });
  answerList.classList.add("answer-list");
  answerListContainer.appendChild(answerList);

  questionFooterNumber.innerText = currentQuestionNumber;
  currentQuestionIndex++;
  currentQuestionNumber++;
}

function selectAnswer(e) {
  const selectedAnswer = e.target;
  if (selectedAnswer.dataset.answer == "true") {
    currentScore += 1;
  }
  score.innerText = currentScore;
  if (currentQuestionIndex >= questions.length) {
    completedBeforeTimer = true;
    clearTimeout(timer);
    endQuiz();
  } else {
    setQuestion();
  }
}

function endQuiz() {
  reset();
  quizEndContainer.classList.toggle("hide");
  questionContainer.classList.toggle("hide");
  footerContainer.classList.toggle("hide");
  finalScore.innerText = currentScore;
  outOfQuestions.innerText = questions.length;
}

let questions = [
  {
    question: "What does the following statement evaluate to?",
    code: "NaN === NaN",
    answers: [
      { text: "true", correct: false },
      { text: "false", correct: true },
      { text: "undefined", correct: false },
      { text: "NaN", correct: false }
    ],
    codeQuestion: true
  },
  {
    question: "What is printed in the console?",
    code: `var foo = function foo() {
    console.log(foo === foo);  
};
foo();`,
    answers: [
      { text: "true", correct: true },
      { text: "false", correct: false },
      { text: "ReferenceError", correct: false },
      { text: "undefined", correct: false }
    ],
    codeQuestion: true
  },
  {
    question: "What HTML element does JavaScript code go inside?",
    answers: [
      { text: "<scripting>", correct: false },
      { text: "<script>", correct: true },
      { text: "<js>", correct: false },
      { text: "<javascript>", correct: false }
    ],
    codeQuestion: false
  },
  {
    question: "What is the result of the following expression?",
    code: "Number('1') - 1 == 0;",
    answers: [
      { text: "true", correct: true },
      { text: "false", correct: false },
      { text: "undefined", correct: false },
      { text: "TypeError", correct: false }
    ],
    codeQuestion: true
  },
  {
    question: "What does the following statement evaluate to?",
    code: "(true + false) > 2 + true;",
    answers: [
      { text: "true", correct: false },
      { text: "false", correct: true },
      { text: "NaN", correct: false },
      { text: "TypeError", correct: false }
    ],
    codeQuestion: true
  },
  {
    question: "What does the following statement evaluate to?",
    code: '"1" - - "1";',
    answers: [
      { text: "0", correct: false },
      { text: "2", correct: true },
      { text: '"11"', correct: false },
      { text: '"1"', correct: false }
    ],
    codeQuestion: true
  },
  {
    question: "What does the following statement evaluate to?",
    code: "new String('This is a string') instanceof String;",
    answers: [
      { text: "true", correct: true },
      { text: "false", correct: false },
      { text: "undefined", correct: false },
      { text: "TypeError", correct: false }
    ],
    codeQuestion: true
  }
];
