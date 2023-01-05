var startButton = document.querySelector('#startButton');
var secondsLeft = 75;
var score = 0;
var currentQuestionIndex = 0;
var timerInterval;

var questionList =  [
    {
        question: 'Commonly used data types DO not include?',
        answer: 'Alerts',
        options: [
            'Strings',
            'Alerts',
            'Booleans',
            'Numbers'
        ]
    },
    {
        question: 'The condition in an if/else statement is enclosed with...',
        answer: 'Curly Brackets',
        options: [
            'Quotes',
            'Parenthesis',
            'Curly Brackets',
            'Square Brackets'
        ]
    },
    {
        question: 'Arrys in JavaScript can be used to store...',
        answer: 'All of the above',
        options: [
            'Numbers and Strings',
            'Other Arrays',
            'Booleans',
            'All of the above'
        ]
    },
    {
        question: 'String values must be enclosed within ..... when being assigned to variables.',
        answer: 'Quotes',
        options: [
            'Quotes',
            'Parenthsis',
            'Commas',
            'Curly Brackets'
        ]
    }
];
// console.log(questionList);

function setTime() {
    timerInterval = setInterval(function() {
        secondsLeft--;
        timer.textContent = secondsLeft
        if (secondsLeft <= 0) {
            secondsLeft = 0
            timer.textContent = secondsLeft
            endQuiz();
        }
    }, 1000);
};

startButton.addEventListener('click', function() {
    // console.log('timer');
    setTime();
    displayQuestion();

});

function checkAnswer(event, userAnswer) {
    // console.log(userAnswer);
    // console.log(questionList[currentQuestionIndex].answer);
    if (userAnswer == questionList[currentQuestionIndex].answer) {
        event.target.setAttribute('style','background-color: success');
        // console.log('here');
    } else {
        secondsLeft -= 10;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex == questionList.length) {
         endQuiz();
    } else {
        setTimeout(() => {
            displayQuestion();
        }, 1000)
    }
};

function displayQuestion() {
    var currentQuestion = questionList[currentQuestionIndex];
    var questionWords = document.createElement('h1');
    questionWords.setAttribute('class', 'text-center m-5 p-5')

    questionWords.innerText = currentQuestion.question;
    document.getElementById('main').innerHTML = "";
    document.querySelector('#main').append(questionWords);

    var div = document.createElement('div');
    div.setAttribute('class', 'd-flex row justify-content-center');
    div.setAttribute('style', 'width: 100%;');
    document.querySelector('#main').append(div);

    for(let i = 0; i < currentQuestion.options.length; i++) {
        const btn = document.createElement('button');

        btn.setAttribute('class', 'btn btn-primary col-6 fw-bold m-3 justify-content-center');
        btn.innerText = currentQuestion.options[i];
        btn.onclick = function(event) {
            checkAnswer(event, currentQuestion.options[i]);
        }
        div.append(btn);
    }

};

function submitScore() {
    var userName = document.getElementById('initials').value;
    if (userName == "") {
        alert('Please enter your initals');
    } else {
        var newScore = {
            'name':userName,
            'score':secondsLeft
        }

        var previousScore = JSON.parse(localStorage.getItem('scores')) || [];
        previousScore.push(newScore);
        previousScore.sort(function(a,b) {
            return b.score-a.score
        });

        //changed previousScores to preivousScore
        localStorage.setItem('scores', JSON.stringify(previousScore)); 
        window.location.href='highscores.html';
    }
};

function endQuiz() {
    clearInterval(timerInterval);
    timer.textContent = secondsLeft;
    document.getElementById('main').innerHTML = 
    `
    <div id ='userInitials'>
        <p class="text-center p-5 fs-4" id ='userInit'>
        All Done! Please enter your initials below
        </p>
        <div class="d-flex justify-content-center m-5">
            <input type ='text' maxlength='3' class="m-3" id='initials'>
            <button onclick='submitScore()' class="btn btn-primary m-3" id='button'>
            Submit Score
            </button>
        </div>
    </div>
    `
};