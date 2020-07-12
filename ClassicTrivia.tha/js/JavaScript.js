
//my code
var questions = userQuestions;
var questionIndex = 0;
var question = document.getElementById("question");
var answer1 = document.getElementById("ans1Content");
var answer2 = document.getElementById("ans2Content");
var answer3 = document.getElementById("ans3Content");
var pointsGroup1 = 0;
var pointsGroup2 = 0;
var userTimeUntilMusicStop = timeUntilMusicStop;
var userTimeUntilViewAnswer = timeUntilViewAnswer;
var mus = document.getElementById("music");
var dinor = document.getElementById("dinor");

function nextQustion() {
    if (questionIndex == questions.length) {
        win();
        return;
    }
    mus.load();
    mus.play();
    //change the content of the question and the answers
    question.innerHTML = questions[questionIndex].question;
    answer1.innerHTML = questions[questionIndex].answer1;
    answer2.innerHTML = questions[questionIndex].answer2;
    answer3.innerHTML = questions[questionIndex].answer3;

    ///
    var anim = "bounceInUp";
    //debugger;
    testAnim(anim);

    //reset the old value answer
    answer1.value = 0;
    answer2.value = 0;
    answer3.value = 0;

    //update the current correct answer
    //document.getElementById("ans" + questions[questionIndex].correctAnswer).value = 1;

    questionIndex++;
    moveProgress(userTimeUntilMusicStop);
    setTimeout(
        function () {
            mus.pause();
            stopper(userTimeUntilViewAnswer, viewCorrectAnswer);
        }, userTimeUntilMusicStop * 1000 + 1000);


}
function viewCorrectAnswer() {
    document.getElementById('id01').style.display = 'block';
    //alert("viewCorrectAnswer" + questions[questionIndex - 1].correctAnswer);
    var correct = document.getElementById("correctAnswer");
    switch (questions[questionIndex - 1].correctAnswer) {
        case 1: correct.innerHTML = questions[questionIndex - 1].answer1;
            break;
        case 2: correct.innerHTML = questions[questionIndex - 1].answer2;
            break;
        case 3: correct.innerHTML = questions[questionIndex - 1].answer3;
            break;
        default: correct.innerHTML = "תשובה 4";
    }
}
function win() {
    mus.load();
    mus.play();
    if (pointsGroup1 > pointsGroup2) {
        document.getElementById("main").innerHTML = ' <h1 class="win">הקבוצה המנצחת היא קבוצה א</h1><canvas width="1920" height="448"></canvas>'
    } else if (pointsGroup1 < pointsGroup2) {
        document.getElementById("main").innerHTML = ' <h1 class="win">הקבוצה המנצחת היא קבוצה ב</h1><canvas width="1920" height="448" ></canvas>'
    }
    else {
        document.getElementById("main").innerHTML = ' <h1 class="win">מספר הנקודות זהה לשתי הקבוצות</h1><canvas width="1920" height="448"></canvas>'
    }
    gameOver();
}

//my stopper
var sec = userTimeUntilMusicStop;
var ms = 0;
var secElem = document.getElementById("sec");
var msElem = document.getElementById("ms");
function stopper(time, func) {
    sec = time;
    secElem.innerHTML = sec < 10 ? ("0" + sec) : sec;
    var interval = setInterval(function () {

        if (sec == 0 && ms == 0) {
            clearInterval(interval);
            if (func)
                func();
            return;
        }

        if (ms == 0) {
            msElem.innerHTML = ms = 100;
            if (sec > 0) {
                secElem.innerHTML = (--sec < 10) ? ("0" + sec) : sec;
            }
        }
        msElem.innerHTML = (--ms < 10) ? ("0" + ms) : ms;
    }, 10);
}

var pb = 0;
function moveProgress(timeInSec, eachTime = 0.01) {
    if (pb == 0) {
        pb = 1;
        var elem = document.getElementById('myBar');
        var width = 1;
        var id = setInterval(frame, eachTime*1000);
        function frame() {
            if (width >= 100) {
                clearInterval(id);
                pb = 0;
            } else {
                width += eachTime*100/timeInSec;
                elem.style.width = width + '%';
            }
        }
    }
}

function cssAnim(elem, anim) {
    elem.classList.add(anim);
}
moveProgress(5, callback);