// Quiz app - 8 basic questions from HTML, CSS and JavaScript

var questions = [
  { q: "Which HTML tag is used for the biggest heading?", options: ["<h6>", "<head>", "<h1>", "<heading>"], answer: 2 },
  { q: "What does CSS stand for?", options: ["Cascading Style Sheets", "Creative Style System", "Computer Style Sheets", "Colorful Style Sheets"], answer: 0 },
  { q: "Which CSS property changes the text color?", options: ["font-color", "text-style", "color", "background"], answer: 2 },
  { q: "Which symbol is used to select an id in CSS?", options: [".", "#", "*", "&"], answer: 1 },
  { q: "Which attribute of the <a> tag holds the link address?", options: ["src", "link", "path", "href"], answer: 3 },
  { q: "Which keyword creates a variable that can change later?", options: ["const", "let", "fixed", "static"], answer: 1 },
  { q: "Which method finds an element by its id in JavaScript?", options: ["document.getElementById()", "document.findId()", "document.selectId()", "document.getId()"], answer: 0 },
  { q: "What does DOM stand for?", options: ["Data Object Method", "Document Object Model", "Display Order Map", "Digital Online Menu"], answer: 1 }
];

var index = 0;
var score = 0;

var qNumber = document.getElementById("qNumber");
var scoreText = document.getElementById("scoreText");
var progressFill = document.getElementById("progressFill");
var questionText = document.getElementById("question");
var optionsBox = document.getElementById("options");
var nextBtn = document.getElementById("nextBtn");
var quizBox = document.getElementById("quizBox");
var resultBox = document.getElementById("resultBox");

function showQuestion() {
  var current = questions[index];

  qNumber.textContent = "Question " + (index + 1) + " of " + questions.length;
  scoreText.textContent = "Score: " + score;
  progressFill.style.width = (index / questions.length * 100) + "%";
  questionText.textContent = current.q;
  optionsBox.innerHTML = "";
  nextBtn.disabled = true;
  nextBtn.textContent = index === questions.length - 1 ? "See result" : "Next question";

  current.options.forEach(function (text, i) {
    var btn = document.createElement("button");
    btn.className = "option";
    btn.textContent = text;
    btn.addEventListener("click", function () { checkAnswer(i); });
    optionsBox.appendChild(btn);
  });
}

function checkAnswer(chosen) {
  var correct = questions[index].answer;
  var buttons = optionsBox.querySelectorAll(".option");

  buttons.forEach(function (b, i) {
    b.disabled = true;
    if (i === correct) b.classList.add("correct");
  });

  if (chosen === correct) {
    score++;
  } else {
    buttons[chosen].classList.add("wrong");
  }

  scoreText.textContent = "Score: " + score;
  nextBtn.disabled = false;
}

function showResult() {
  quizBox.classList.add("hidden");
  resultBox.classList.remove("hidden");
  document.getElementById("finalScore").textContent = score + " / " + questions.length;

  var msg = "";
  if (score === questions.length) msg = "Perfect score. Well done!";
  else if (score >= 5) msg = "Good job. A little more practice and you will get full marks.";
  else msg = "Keep practicing. Read the basics once more and try again.";
  document.getElementById("finalMessage").textContent = msg;
}

nextBtn.addEventListener("click", function () {
  index++;
  if (index < questions.length) showQuestion();
  else showResult();
});

document.getElementById("restartBtn").addEventListener("click", function () {
  index = 0;
  score = 0;
  resultBox.classList.add("hidden");
  quizBox.classList.remove("hidden");
  showQuestion();
});

showQuestion();
