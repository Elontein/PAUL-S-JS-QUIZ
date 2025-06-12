const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const timeCount = document.querySelector('.timer .time-sec');
const resultBox = document.querySelector('.result-box');
const restartBtn = document.querySelector('.restart-btn');
const goHomeBtn = document.querySelector('.go-home-btn');


startBtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
}

exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
     main.classList.remove('active');
}
continueBtn.onclick = () => {
    popupInfo.classList.remove('active');
    quizSection.classList.add('active');
     main.classList.remove('active');
      quizBox.classList.add('active');

      showQuestions(0);
      questionCounter(1);
        headerScore();
        startTimer(10); // Start the timer with 10 seconds for each question
    
}
restartBtn.onclick = () => {
    nextBtn.classList.remove('active');
    quizBox.classList.add('active');
    resultBox.classList.remove('active');   
    questionCount = 0;
    questionNumb = 1;
    userScore = 0;

    showQuestions(questionCount);
    questionCounter(questionNumb);
    headerScore();
}
goHomeBtn.onclick = () => {
    quizSection.classList.remove('active'); 
    nextBtnBox.classList.remove('active');
    resultBox.classList.remove('active');
    questionCount = 0;  
    questionNumb = 1;
    userScore = 0;

    showQuestions(questionCount);
    questionCounter(questionNumb);
}
    


let questionCount = 0;
let questionNumb = 1;
let userScore = 0;
let counter;
let timeValue = 10; // 10 seconds for each question

const nextBtn = document.querySelector('.next-btn');

nextBtn.onclick = () => {
    if (questionCount < questions.length - 1) {
        questionCount++;
    showQuestions(questionCount);
    clearInterval(counter); // Clear the previous timer
    startTimer(timeValue); // Reset the timer for the next question

    questionNumb++;
    questionCounter(questionNumb);

    nextBtn.classList.remove('active');

    }
    else {
        showResultBox();
        nextBtn.classList.remove('active');
    }
    
}

const optionList = document.querySelector('.option-list');

//getting questions and options from array
function showQuestions(index) {
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

    let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
    <div class="option"><span>${questions[index].options[1]}</span></div>
    <div class="option"><span>${questions[index].options[2]}</span></div>
    <div class="option"><span>${questions[index].options[3]}</span></div> `;

    optionList.innerHTML = optionTag;

    const option = document.querySelectorAll('.option');
for (let i = 0; i < option.length; i++) {
    option[i].setAttribute('onclick', 'optionSelected(this)');
}
}

function optionSelected(answer) {
    clearInterval(counter); // Clear the previous timer
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    let allOptions = optionList.children.length;

    if (userAnswer == correctAnswer) {
        answer.classList.add('correct');
        userScore += 1;
        headerScore(); 

    }
    else {
        answer.classList.add('incorrect');
        //if user selects wrong answer, show correct answer
        for (let i = 0; i < allOptions; i++) {
            if (optionList.children[i].textContent == correctAnswer) {
                optionList.children[i].setAttribute('class', 'option correct');
            }
        }
    }

    //disabling all options after user selects one
    for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add('disabled');
    }
    nextBtn.classList.add('active');
 }

 function questionCounter(index) {
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} of ${questions.length} Questions`
 }

 function headerScore() {
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
 }
 function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time;   
        time--;
       
    }
    //startTimer(timeValue);
 }
// This function is called to show the result box after the quiz ends


 function showResultBox() {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

     const scoreText = document.querySelector('.score-text');
     if (userScore > 6) {
         let scoreTag = `<span>Congratulations! You scored ${userScore} out of ${questions.length}.</span>`;
         scoreText.innerHTML = scoreTag;
     } else if (userScore > 3 && userScore <= 6) {
         // If the score is between 4 and 6
         let scoreTag = `<span>Good job! You scored ${userScore} out of ${questions.length}.</span>`;
         scoreText.innerHTML = scoreTag;
     } else {
         let scoreTag = `<span>Better luck next time! You scored ${userScore} out of ${questions.length}.</span>`;
         scoreText.innerHTML = scoreTag;
     }


    const circularProgress = document.querySelector('.circular-progress');
     const progressValue = document.querySelector('.progress-value');
    let progressStartValue = 0;
     let progressEndValue = (userScore / questions.length) * 100;
     let speed = 20; // The speed of the progress bar animation
     let progress = setInterval(() => {
         progressStartValue++;
         progressValue.textContent = `${progressStartValue}%`;
          circularProgress.style.background = `conic-gradient(
rgb(122, 26, 218) ${progressStartValue * 3.6}deg,
rgb(230, 210, 234) ${progressStartValue * 3.6}deg
          )`;

         if (progressStartValue == progressEndValue) {
             clearInterval(progress);
         }
     }, speed);
  }


