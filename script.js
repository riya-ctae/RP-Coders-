// Join Quiz
function joinQuiz() {
    let name = document.getElementById("studentName").value;
    let code = document.getElementById("quizCode").value;

    if (name === "" || code === "") {
        alert("Please enter your name and quiz code.");
        return;
    }

    localStorage.setItem("studentName", name);
    window.location.href = "quiz.html";
}

// Teacher Create Quiz
function saveQuiz() {
    alert("Quiz Created Successfully!");
}

// Quiz Submit
function nextQuestion() {
    let score = 8;
    localStorage.setItem("score", score);
    window.location.href = "result.html";
}

// Timer
let time = 20;

window.onload = function () {
    const timer = document.getElementById("timer");

    if (timer) {
        const countdown = setInterval(() => {
            timer.innerHTML = "Time Left: " + time + " sec";
            time--;

            if (time < 0) {
                clearInterval(countdown);
                window.location.href = "result.html";
            }
        }, 1000);
    }
};
// Register
async function registerUser() {

    const response = await fetch("http://127.0.0.1:5000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        })
    });

    const result = await response.json();
        alert(result.message);
}

// Login
async function loginUser() {

    const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        })
    });

    const result = await response.json();
    alert(result.message);

    if (result.message === "Login Successful") {
        window.location.href = "student.html";
    }
}