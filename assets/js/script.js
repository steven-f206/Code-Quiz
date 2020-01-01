document.addEventListener('DOMContentLoaded', (event) => {

    // Setting intial required variables 
  
    const initialTime = 75
    let time = 75;
    let score = 0;
    let qCount = 0;
  
    //Sets array then if local storage exists it populates it into the array of records.
    let recordsArray = [];
    if (localStorage.getItem('recordsArray')) {
        recordsArray = JSON.parse(localStorage.getItem('recordsArray'));
    }
  
    // Function to reset HTML display for the score
    let recordsHtmlReset = () => {
        document.querySelector('#highScores div').innerHTML = "";
        var i = 1;
        recordsArray.sort((a, b) => b.score - a.score);
        Array.from(recordsArray).forEach(check => {
            var scores = document.createElement("div");
            scores.innerHTML = i + ". " + check.initialRecord + " - " + check.score;
            document.querySelector('#highScores div').appendChild(scores);
            i = i + 1
        });
        i = 0;
    }
  
    //Set the question Initial data in questionHolder section
    let setQuestionData = () => {
        document.querySelector('#quizHolder p').innerHTML = questions[0].title;
        document.querySelector('#quizHolder ol li:nth-of-type(1)').innerHTML = `1. ${questions[qCount].choices[0]}`;
        document.querySelector('#quizHolder ol li:nth-of-type(2)').innerHTML = `2. ${questions[qCount].choices[1]}`;
        document.querySelector('#quizHolder ol li:nth-of-type(3)').innerHTML = `3. ${questions[qCount].choices[2]}`;
        document.querySelector('#quizHolder ol li:nth-of-type(4)').innerHTML = `4. ${questions[qCount].choices[3]}`;
    }
  
    setQuestionData();
  
  
    // Handles time related events
    let myTimer = () => {
        if (time > 0) {
            time = time - 1;
            document.getElementById('time').innerHTML = time;
        } else {
            clearInterval(clock);
            document.getElementById('score').innerHTML = score;
            document.getElementById('finish').classList.remove('hide');
            document.getElementById('quizHolder').classList.add('hide');
        }
    }
  
    // On intro button click start time and starts giving questions
    let clock;
    document.querySelector("#intro button").addEventListener("click", (e) => {
        document.getElementById('intro').classList.add('hide');
        document.getElementById('quizHolder').classList.remove('hide');
        clock = setInterval(myTimer, 1000);
    });
  
    // Clears timeout if next question is answered before current timeout is reached or if form element has a requirement not met.
    let timeset;
    let scoreIndicator = () => {
        clearTimeout(timeset);
        timeset = setTimeout(() => {
            document.querySelector('#scoreIndicator').classList.add('invisible');
        }, 3000);
    }
  
    let errorIndicator = () => {
      clearTimeout(timeset);
      timeset = setTimeout(() => {
          document.querySelector('#errorIndicator').classList.add('invisible');
      }, 3000);
  }
  
    // Create an array of selected divs so I can refer to them with the this keyword and replace their values to then check against the answer property for all questions.
    let answers = document.querySelectorAll('#quizHolder ol li');
    Array.from(answers).forEach(check => {
        check.addEventListener('click', function(event) {
            // Handles events if a question is answered correctly
            if (this.innerHTML.substring(3, this.length) === questions[qCount].answer) {
                score = score + 1;
                qCount = qCount + 1;
                document.querySelector('#scoreIndicator p').innerHTML = "Correct!"
                document.querySelector('#scoreIndicator').classList.remove('invisible', scoreIndicator());
                // If all the questions have been answered exist the quiz section
                if (qCount === questions.length) {
                    document.getElementById('quizHolder').classList.add('hide');
                    document.getElementById('finish').classList.remove('hide');
                    time = 0;
                    document.getElementById('time').innerHTML = time;
                } else {
                    // Updates copy in questions with the net array's question text.
                    setQuestionData();
                }
            } else {
                // Handles events if a question is answered incorrectly.
                time = time - 10;
                document.querySelector('#scoreIndicator p').innerHTML = "Wrong!";
                document.querySelector('#scoreIndicator').classList.remove('invisible', scoreIndicator());
                if (time < 0) {
                    time = 0;
                    document.getElementById('time').innerHTML = time;
                }
                qCount = qCount + 1;
                if (qCount === questions.length) {
                    document.getElementById('quizHolder').classList.add('hide');
                    document.getElementById('finish').classList.remove('hide');
                    time = 0;
                    document.getElementById('time').innerHTML = time;
                } else {
                    setQuestionData();
                }
            }
        });
    });
  
  // Error handling for submitting high scores
    document.querySelector("#records button").addEventListener("click", () => {
  
        let initialsRecord = document.querySelector('#initials').value;
        if (initialsRecord === '') {
            document.querySelector('#errorIndicator p').innerHTML = "You need at least 1 character";
            document.querySelector('#errorIndicator').classList.remove('invisible', errorIndicator());
        } else if (initialsRecord.match(/[[A-Za-z]/) === null) {
            document.querySelector('#errorIndicator p').innerHTML = "Only letters for initials allowed.";
            document.querySelector('#errorIndicator').classList.remove('invisible', errorIndicator());
        } else if (initialsRecord.length > 5) {
            document.querySelector('#errorIndicator p').innerHTML = "Maximum of 5 characters allowed.";
            document.querySelector('#errorIndicator').classList.remove('invisible', errorIndicator());
        } else {
            //Sends value to current array for use now.
            recordsArray.push({
                "initialRecord": initialsRecord,
                "score": score
            });
            //Sends value to local storage for later use.
            localStorage.setItem('recordsArray', JSON.stringify(recordsArray));
            document.querySelector('#highScores div').innerHTML = '';
            document.getElementById('finish').classList.add('hide');
            document.getElementById('highScores').classList.remove('hide');
            recordsHtmlReset();
            document.querySelector("#initials").value = '';
        }
    });
  
    // Clears highscores from the html, array and localstorage
    document.querySelector("#clearScores").addEventListener("click", () => {
        recordsArray = [];
        document.querySelector('#highScores div').innerHTML = "";
        localStorage.removeItem('recordsArray');
    });
  
    // Resets all quiz settings to the default to replay the quiz
    document.querySelector("#reset").addEventListener("click", () => {
        time = initialTime;
        score = 0;
        qCount = 0;
        setQuestionData();
        let sections = document.querySelectorAll("section");
        Array.from(sections).forEach((userItem) => {
            userItem.classList.add('hide');
        });
        document.getElementById('intro').classList.remove('hide');
    });
  
    // If a player pushes the view high scores button in the html view this abdandons all quiz progress and lets them view the high scores.
    document.getElementById("scores").addEventListener("click", (e) => {
        e.preventDefault();
        clearInterval(clock);
        document.getElementById('time').innerHTML = 0;
        time = initialTime;
        score = 0;
        qCount = 0;
        setQuestionData();
        let sections = document.querySelectorAll("section");
        Array.from(sections).forEach((userItem) => {
            userItem.classList.add('hide');
        });
        document.getElementById('highScores').classList.remove('hide');
        recordsHtmlReset();
    });
  
  
  });