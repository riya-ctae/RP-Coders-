// ===============================
// Firebase Imports
// ===============================

import { db } from "./firebase.js";

import {
collection,
doc,
setDoc
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";


// ===============================
// Create Quiz
// ===============================

window.createQuiz = async function(){

let quizTitle = document.getElementById("quizTitle").value.trim();

let question = document.getElementById("question").value.trim();

let option1 = document.getElementById("option1").value.trim();

let option2 = document.getElementById("option2").value.trim();

let option3 = document.getElementById("option3").value.trim();

let option4 = document.getElementById("option4").value.trim();

let answer = document.getElementById("answer").value;

if(
quizTitle=="" ||
question=="" ||
option1=="" ||
option2=="" ||
option3=="" ||
option4=="" ||
answer==""
){

alert("Please fill all fields");

return;

}

let quizCode = Math.floor(
100000 + Math.random()*900000
).toString();

try{

await setDoc(doc(db,"quizzes",quizCode),{

title:quizTitle,

question:question,

options:[

option1,
option2,
option3,
option4

],

answer:answer,

quizCode:quizCode,

createdAt:new Date().toISOString()

});

alert("Quiz Created Successfully");

alert("Quiz Code : " + quizCode);

localStorage.setItem("currentQuizCode",quizCode);

}catch(error){

alert(error.message);

}

}
// ===============================
// Join Quiz
// ===============================

import {
doc,
getDoc
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

window.joinQuiz = async function(){

let studentName = document.getElementById("studentName").value.trim();

let quizCode = document.getElementById("quizCode").value.trim();

if(studentName=="" || quizCode==""){

alert("Please fill all fields");

return;

}

try{

const quizRef = doc(db,"quizzes",quizCode);

const quizSnap = await getDoc(quizRef);

if(quizSnap.exists()){

localStorage.setItem("studentName",studentName);

localStorage.setItem("currentQuizCode",quizCode);

localStorage.setItem(
"quizData",
JSON.stringify(quizSnap.data())
);

window.location.href="quiz.html";

}else{

alert("Quiz Not Found");

}

}catch(error){

alert(error.message);

}

}


// ===============================
// Load Quiz
// ===============================

window.loadQuiz = function(){

let quiz = JSON.parse(
localStorage.getItem("quizData")
);

if(!quiz){

alert("Quiz Data Not Found");

window.location.href="student.html";

return;

}

document.getElementById("quizTitle").innerHTML =
quiz.title;

document.getElementById("question").innerHTML =
quiz.question;

document.getElementById("option1").innerHTML =
quiz.options[0];

document.getElementById("option2").innerHTML =
quiz.options[1];

document.getElementById("option3").innerHTML =
quiz.options[2];

document.getElementById("option4").innerHTML =
quiz.options[3];

}
// ===============================
// Answer Select
// ===============================

let selectedAnswer = "";

window.selectAnswer = function(answer){

selectedAnswer = answer;

}


// ===============================
// Submit Quiz
// ===============================

import {
collection,
addDoc
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

window.submitQuiz = async function(){

let quiz = JSON.parse(localStorage.getItem("quizData"));

let score = 0;

if(selectedAnswer == quiz.answer){

score = 1;

}

let student = localStorage.getItem("studentName");

let percentage = (score * 100).toFixed(2);

try{

await addDoc(collection(db,"results"),{

student:student,

quizCode:quiz.quizCode,

score:score,

total:1,

percentage:percentage,

date:new Date().toISOString()

});

localStorage.setItem("score",score);

localStorage.setItem("total",1);

localStorage.setItem("percentage",percentage);

window.location.href="result.html";

}catch(error){

alert(error.message);

}

}


// ===============================
// Load Result
// ===============================

window.loadResult = function(){

document.getElementById("studentName").innerHTML =
localStorage.getItem("studentName");

document.getElementById("score").innerHTML =
localStorage.getItem("score");

document.getElementById("total").innerHTML =
localStorage.getItem("total");

document.getElementById("percentage").innerHTML =
localStorage.getItem("percentage");

}
// ===============================
// Load Leaderboard
// ===============================

import {
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

window.loadLeaderboard = async function(){

let table = document.getElementById("leaderboardTable");

table.innerHTML = "";

try{

const querySnapshot = await getDocs(collection(db,"results"));

let data = [];

querySnapshot.forEach((doc)=>{

data.push(doc.data());

});

data.sort((a,b)=>b.score-a.score);

data.forEach((item,index)=>{

table.innerHTML += `
<tr>

<td>${index+1}</td>

<td>${item.student}</td>

<td>${item.score}</td>

<td>${item.percentage}%</td>

</tr>
`;

});

}catch(error){

alert(error.message);

}

};


// ===============================
// Load Profile
// ===============================

window.loadProfile = function(){

document.getElementById("profileName").innerHTML =
localStorage.getItem("studentName");

document.getElementById("profileEmail").innerHTML =
localStorage.getItem("userEmail");

};


// ===============================
// Logout
// ===============================

window.logout = function(){

localStorage.clear();

window.location.href = "login.html";

};
