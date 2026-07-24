let quizzes = [];
let currentQuestion = 0;
let score = 0;

// -------------------- Register --------------------

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

// -------------------- Login --------------------

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

    if(result.message==="Login Successful"){

        window.location.href="student.html";

    }

}

// -------------------- Teacher --------------------

async function saveQuiz(){

    const response=await fetch("http://127.0.0.1:5000/add_quiz",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            question:document.getElementById("question").value,

            option1:document.getElementById("option1").value,

            option2:document.getElementById("option2").value,

            option3:document.getElementById("option3").value,

            option4:document.getElementById("option4").value,

            answer:document.getElementById("answer").value

        })

    });

    const result=await response.json();

    alert(result.message);

}

// -------------------- Student --------------------

function joinQuiz(){

    let name=document.getElementById("studentName").value;

    if(name==""){

        alert("Enter Name");

        return;

    }

    localStorage.setItem("studentName",name);

    window.location.href="quiz.html";

}

// -------------------- Load Quiz --------------------

async function loadQuiz(){

    if(!document.getElementById("question")) return;

    const response=await fetch("http://127.0.0.1:5000/get_quiz");

    quizzes=await response.json();

    showQuestion();

    startTimer();

}

// -------------------- Show Question --------------------

function showQuestion(){

    let q=quizzes[currentQuestion];

    document.getElementById("question").innerHTML=q.question;

    let labels=document.querySelectorAll(".options label");

    labels[0].innerHTML=`<input type="radio" name="answer" value="${q.option1}"> ${q.option1}`;

    labels[1].innerHTML=`<input type="radio" name="answer" value="${q.option2}"> ${q.option2}`;

    labels[2].innerHTML=`<input type="radio" name="answer" value="${q.option3}"> ${q.option3}`;

    labels[3].innerHTML=`<input type="radio" name="answer" value="${q.option4}"> ${q.option4}`;

}

// -------------------- Timer --------------------

let time=20;

function startTimer(){

    const timer=document.getElementById("timer");

    if(!timer) return;

    time=20;

    timer.innerHTML="Time Left : "+time+" sec";

    let countdown=setInterval(function(){

        time--;

        timer.innerHTML="Time Left : "+time+" sec";

        if(time<=0){

            clearInterval(countdown);

            nextQuestion();

        }

    },1000);

}

// -------------------- Next --------------------

function nextQuestion(){

    let selected=document.querySelector('input[name="answer"]:checked');

    if(selected){

        if(selected.value===quizzes[currentQuestion].answer){

            score++;

        }

    }

    currentQuestion++;

    if(currentQuestion<quizzes.length){

        showQuestion();

        startTimer();

    }

    else{

        localStorage.setItem("score",score);

        localStorage.setItem("total",quizzes.length);

        window.location.href="result.html";

    }

}

window.onload=function(){

    loadQuiz();

}