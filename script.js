// Join Quiz Function
function joinQuiz() {

    let name = document.getElementById("studentName").value;
    let code = document.getElementById("quizCode").value;

    if (name === "" || code === "") {
        alert("Please enter your name and quiz code.");
    } else {
        alert("Welcome " + name + "!");
        window.location.href = "quiz.html";
    }
}

// Quiz Timer
let time = 20;

function startTimer() {

    let timer = document.getElementById("timer");

    if (!timer) return;

    let countdown = setInterval(function () {

        timer.innerHTML = "Time Left: " + time + " sec";

        time--;

        if (time < 0) {

            clearInterval(countdown);

            alert("Time's Up!");

            window.location.href = "result.html";
        }

    }, 1000);
}

// Next Question
function nextQuestion() {

    alert("Next Question");

    window.location.href = "result.html";
}

// Teacher Create Quiz
function createQuiz() {

    alert("Quiz Created Successfully!");

}

// Home Page
function startQuiz() {

    window.location.href = "login.html";

}