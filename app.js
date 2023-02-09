const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
const button = document.getElementById("btn")
const inputFirstname = document.getElementById("firstname")
const inputLastname = document.getElementById("lastname")
const inputNumber = document.getElementById("phone-number")
const errorMessage = document.getElementById('error-message')
const errorMessage1 = document.getElementById('error-message1')
const errorMessage2 = document.getElementById('error-message2')

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;

function setAvailableQuestions(){
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion; i++){
    	availableQuestions.push(quiz[i]);
   }
}
 
function getNewQuestion(){
   questionNumber.innerHTML = "Question No." + (questionCounter + 1) + ":" ;

   const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
   currentQuestion = questionIndex;
   questionText.innerHTML = currentQuestion.q;
   const index1= availableQuestions.indexOf(questionIndex);
   availableQuestions.splice(index1,1);
   if(currentQuestion.hasOwnProperty("img")){
      const img = document.createElement("img");
      img.src = currentQuestion.img;
      questionText.appendChild(img);
   }

   const optionLen = currentQuestion.options.length;
   for(let i=0; i<optionLen; i++){
      availableOptions.push(i)
   }

    optionContainer.innerHTML = '';
    let animationDelay = 0.15;

    for(let i=0; i<optionLen; i++){
      const optonIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
      const index2 =  availableOptions.indexOf(optonIndex);
      availableOptions.splice(index2,1);

      const option = document.createElement("div");
      option.innerHTML = currentQuestion.options[optonIndex];
      option.id = optonIndex;
      option.style.animationDelay =animationDelay + 's';
      animationDelay = animationDelay + 0.15;
      option.className = "option";
      optionContainer.appendChild(option);
      option.setAttribute("onclick","getResult(this)");
      }
    questionCounter++;
}

function getResult(element){
   const id = parseInt(element.id);

   if(id === currentQuestion.answer){
     	element.classList.add("correct");
     	correctAnswers++;
   }
   else{
     	element.classList.add("wrong");

      const optionLen = optionContainer.children.length;

      for(let i=0; i<optionLen; i++){
         if(parseInt(optionContainer.children[i].id) === currentQuestion.answer){
              optionContainer.children[i].classList.add("correct");
            }
         }
      }
   attempt++;
   unclickableOptions();
}
 
function unclickableOptions(){
   const optionLen = optionContainer.children.length;

   for(let i=0 ; i<optionLen; i++){
      optionContainer.children[i].classList.add("already-answered");
   }
}
 

function next(){
   if(questionCounter === quiz.length){
      quizOver();
   }
   else{
      getNewQuestion();
   }
}

function quizOver(){
 	quizBox.classList.add("hide");
 	resultBox.classList.remove("hide");
   quizResult();
}

function quizResult(){
   resultBox.querySelector(".total-question").innerHTML = quiz.length;
   resultBox.querySelector(".total-attempt").innerHTML = attempt;
   resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
   resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
   const percentage = (correctAnswers/quiz.length)*100;
   resultBox.querySelector(".percentage").innerHTML =percentage.toFixed(2) + "%";
   resultBox.querySelector(".total-score").innerHTML =correctAnswers +" / " + quiz.length;
}

function resetQuiz(){
   questionCounter = 0;
   correctAnswers = 0;
   attempt = 0;
   availableQuestions = [];
}

function tryAgainQuiz(){
 	resultBox.classList.add("hide");
 	quizBox.classList.remove("hide");
   resetQuiz();
   startQuiz();
}

function goToHome(){
 	resultBox.classList.add("hide");
 	homeBox.classList.remove("hide");
 	resetQuiz();
}
 
function startQuiz(){
   homeBox.classList.add("hide");
   quizBox.classList.remove("hide");
   setAvailableQuestions();
   getNewQuestion();
}

button.addEventListener("click", contactUs)

function contactUs() {
  console.log("Message sent, you will be contacted")
}

inputFirstname.addEventListener("input", () => {
  if (inputFirstname.value.length < 2) {
    errorMessage.style.visibility = "visible"
    inputFirstname.style.borderColor = "darkred"
    button.disabled = true
  } else {
    errorMessage.style.visibility = "hidden"
    inputFirstname.style.borderColor = "black"
    button.disabled = false
  }
})

inputLastname.addEventListener("input", () => {
   if (inputLastname.value.length < 2) {
     errorMessage1.style.visibility = "visible"
     inputLastname.style.borderColor = "darkred"
     button.disabled = true
   } else {
     errorMessage1.style.visibility = "hidden"
     inputLastname.style.borderColor = "black"
     button.disabled = false
   }
 })

 inputNumber.addEventListener("input", () => {
   if (inputNumber.value.length < 5) {
     errorMessage2.style.visibility = "visible"
     inputNumber.style.borderColor = "darkred"
     button.disabled = true
   } else {
     errorMessage2.style.visibility = "hidden"
     inputNumber.style.borderColor = "black"
     button.disabled = false
   }
 })

window.onload = function (){
	homeBox.querySelector(".total-question").innerHTML = quiz.length;
}
