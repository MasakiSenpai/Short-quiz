var startButton = document.querySelector('#startButton');
var secondsLeft = 75;
var score = 0;
var currentQuestionIndex = 0;
var timerInterval;

var questionList =  [
    {
        question: 'What color are bananas?',
        answer: 'Yellow',
        options: [
            'Blue',
            'Green',
            'Yellow',
            'Purple'
        ]
    },
    {
        question: 'What state is water?',
        answer: 'Liquid',
        options: [
            'Liquid',
            'Solid',
            'Gas',
            'Frozen'
        ]
    },
    {
        question: 'What flavor is a pickle?',
        answer: 'Sour',
        options: [
            'Sweet',
            'Sour',
            'Bitter',
            'Spicy'
        ]
    },
    {
        question: 'What is the freezing point of water?',
        answer: '32 degrees F',
        options: [
            '0 degrees F',
            '32 degrees F',
            '10 degrees F',
            '-10 degrees F'
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
    console.log('timer');
    setTime();
    displayQuestion();

});

function checkAnswer(event, userAnswer) {
    if (userAnswer == questionList[currentQuestionIndex].correctAnswer) {
        // event.target.setAttribute('style','background-color: success');
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

    questionWords.innerText = currentQuestion.question;
    document.getElementById('main').innerHTML = "";
    document.querySelector('#main').append(questionWords);

    var div = document.createElement('div');
    div.setAttribute('class', 'btn btn-primary');
    document.querySelector('#main').append(div);

    for(let i = 0; i < currentQuestion.options.length; i++) {
        const btn = document.createElement('button');

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
        window.location.href='highscore.html';
    }
};

function endQuiz() {
    clearInterval(timerInterval);
    timer.textContent = secondsLeft;
    document.getElementById('main').innerHTML = 
    `
    <div id ='userInitials'>
        <p id ='userInit'>
        Please enter your initials
        </p>
        <input type ='text' maxlength='3' id='initials'>
        <button onclick='submitScore()' id='submit'>
        Submit Score
        </button>
    </div>
    `
};