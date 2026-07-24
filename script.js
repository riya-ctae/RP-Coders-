let quizzes = [];
let currentQuestion = 0;
let score = 0;
let timerInterval;


// ---------------- Register ----------------

async function registerUser() {

    const response = await fetch("http://127.0.0.1:5000/register", {

        method: "POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value

        })

    });


    const result = await response.json();

    alert(result.message);

}



// ---------------- Login ----------------

async function loginUser(){

    const response = await fetch("http://127.0.0.1:5000/login",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            email:document.getElementById("email").value,
            password:document.getElementById("password").value

        })

    });


    const result = await response.json();

    alert(result.message);


    if(result.message==="Login Successful"){

        window.location.href="student.html";

    }

}



// ---------------- Teacher Add Quiz ----------------

async function saveQuiz(){

    const response = await fetch("http://127.0.0.1:5000/add_quiz",{

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


    const result = await response.json();

    alert(result.message);

}



// ---------------- Student Join ----------------

function joinQuiz(){
    let name=document.getElementById("studentName").value;
    if(name===""){
        alert("Enter Name");
        return;
    }
    localStorage.setItem("studentName",name);
    window.location.href="quiz.html";
}
// ---------------- Load Questions ----------------  

async function loadQuiz(){

    const questionBox=document.getElementById("question");


    if(!questionBox){
        return;
    }


    const response=await fetch("http://127.0.0.1:5000/get_quiz");


    quizzes=await response.json();


    if(quizzes.length===0){

        questionBox.innerHTML="No Quiz Available";
        return;

    }


    showQuestion();

    startTimer();

}



// ---------------- Display Question ----------------

function showQuestion(){

    let q=quizzes[currentQuestion];


    document.getElementById("question").innerHTML=q.question;


    let labels=document.querySelectorAll(".options label");


    labels[0].innerHTML=
    `<input type="radio" name="answer" value="${q.option1}"> ${q.option1}`;


    labels[1].innerHTML=
    `<input type="radio" name="answer" value="${q.option2}"> ${q.option2}`;


    labels[2].innerHTML=
    `<input type="radio" name="answer" value="${q.option3}"> ${q.option3}`;


    labels[3].innerHTML=
    `<input type="radio" name="answer" value="${q.option4}"> ${q.option4}`;

}
// ---------------- Timer ----------------

function startTimer(){

    const timer=document.getElementById("timer");

    if(!timer){
        return;
    }


    clearInterval(timerInterval);


    let time=20;


    timer.innerHTML="Time Left : "+time+" sec";


    timerInterval=setInterval(()=>{


        time--;


        timer.innerHTML="Time Left : "+time+" sec";


        if(time<=0){

            clearInterval(timerInterval);

            nextQuestion();

        }


    },1000);

}



// ---------------- Next Question ----------------

function nextQuestion(){


    clearInterval(timerInterval);



    let selected=document.querySelector(
        'input[name="answer"]:checked'
    );



    if(selected){


        if(selected.value===quizzes[currentQuestion].answer){

            score++;

        }

    }



    currentQuestion++;



    if(currentQuestion < quizzes.length){


        showQuestion();

        startTimer();


    }

    else{


        saveResult();


    }

}




// ---------------- Save Result ----------------

async function saveResult(){


    let studentName=
    localStorage.getItem("studentName");



    localStorage.setItem("score",score);

    localStorage.setItem("total",quizzes.length);



    await fetch("http://127.0.0.1:5000/save_result",{

        method:"POST",

        headers:{

            "Content-Type":"application/json"

        },


        body:JSON.stringify({

            student_name:studentName,

            score:score

        })

    });



    window.location.href="result.html";


}



// ---------------- Result Data ----------------

async function loadResult(){


    const scoreBox=document.getElementById("score");


    if(!scoreBox){

        return;

    }



    let score=
    localStorage.getItem("score");


    let total=
    localStorage.getItem("total");



    scoreBox.innerHTML=
    score+" / "+total;



    const response=
    await fetch("http://127.0.0.1:5000/leaderboard");



    const data=
    await response.json();



    const table=
    document.getElementById("leaderboard");



    if(table){


        data.forEach((student,index)=>{


            table.innerHTML += `

            <tr>

            <td>${index+1}</td>

            <td>${student.student_name}</td>

            <td>${student.score}</td>

            </tr>

            `;


        });


    }


}




// ---------------- Page Load ----------------

window.onload=function(){


    loadQuiz();

    loadResult();


};