document.addEventListener('DOMContentLoaded', (event) => {

    const initialTime = 75
    let time = 75;
    let score = 0;
    let qCount = 0;
    let recordsArray = [];
   
    //Set the question Initial data in questionHolder section
    let qtitle = document.querySelector('#quizHolder p')
    let q1 = document.querySelector('#quizHolder ol li:nth-of-type(1) div');
    let q2 = document.querySelector('#quizHolder ol li:nth-of-type(2) div');
    let q3 = document.querySelector('#quizHolder ol li:nth-of-type(3) div');
    let q4 = document.querySelector('#quizHolder ol li:nth-of-type(4) div');
   
    qtitle.innerHTML = questions[0].title;
    q1.innerHTML = `1. ${questions[qCount].choices[0]}`;
    q2.innerHTML = `2. ${questions[qCount].choices[1]}`;
    q3.innerHTML = `3. ${questions[qCount].choices[2]}`;
    q4.innerHTML = `4. ${questions[qCount].choices[3]}`;
   
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
   
    // On intro button click start time and giving questions
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
      document.querySelector('#scoreIndicator').classList.add('hide')
     }, 3000);
    }
   
    // Create an array of selected divs so I can refer to them with the this keyword and replace their values to then check against the answer property for all questions.
    let answers = document.querySelectorAll('#quizHolder ol li div');
    Array.from(answers).forEach(check => {
     check.addEventListener('click', function(event) {
      // Handles events if a question is answered correctly
      if (this.innerHTML.substring(3, this.length) === questions[qCount].answer) {
       score = score + 1;
       qCount = qCount + 1;
       document.querySelector('#scoreIndicator p').innerHTML = "Correct!"
       document.querySelector('#scoreIndicator').classList.remove('hide', scoreIndicator());
       // If all the questions have been answered exist the
       if (qCount === questions.length) {
        document.getElementById('quizHolder').classList.add('hide');
        document.getElementById('finish').classList.remove('hide');
        time = 0;
        document.getElementById('time').innerHTML = time;
       } else {
        // Updates copy in questions with the net array's question text.
        qtitle.innerHTML = questions[qCount].title;
        q1.innerHTML = `1. ${questions[qCount].choices[0]}`;
        q2.innerHTML = `2. ${questions[qCount].choices[1]}`;
        q3.innerHTML = `3. ${questions[qCount].choices[2]}`;
        q4.innerHTML = `4. ${questions[qCount].choices[3]}`;
       }
      } else {
        // Handles events if a question is answered incorrectly.
       time = time - 10;
       document.querySelector('#scoreIndicator p').innerHTML = "Wrong!";
       document.querySelector('#scoreIndicator').classList.remove('hide', scoreIndicator());
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
        qtitle.innerHTML = questions[qCount].title;
        q1.innerHTML = `1. ${questions[qCount].choices[0]}`;
        q2.innerHTML = `2. ${questions[qCount].choices[1]}`;
        q3.innerHTML = `3. ${questions[qCount].choices[2]}`;
        q4.innerHTML = `4. ${questions[qCount].choices[3]}`;
       }
      }
     });
    });
   
   
    document.querySelector("#records button").addEventListener("click", () => {
   
     let initialsRecord = document.querySelector('#initials').value;
     if (initialsRecord === '') {
      document.querySelector('#scoreIndicator p').innerHTML = "You need at least 1 character";
      document.querySelector('#scoreIndicator').classList.remove('hide', scoreIndicator());
     } else if (initialsRecord.match(/[[A-Za-z]/) === null) {
      document.querySelector('#scoreIndicator p').innerHTML = "Only letters for initials allowed.";
      document.querySelector('#scoreIndicator').classList.remove('hide', scoreIndicator());
     } else if (initialsRecord.length > 5) {
      document.querySelector('#scoreIndicator p').innerHTML = "Maximum of 5 characters allowed.";
      document.querySelector('#scoreIndicator').classList.remove('hide', scoreIndicator());
     } else {
      recordsArray.push({
       "initialRecord": initialsRecord,
       "score": score
      });
      console.log(recordsArray);
      document.querySelector('#highScores div').innerHTML = '';
      document.getElementById('finish').classList.add('hide');
      document.getElementById('highScores').classList.remove('hide');
   
      var i = 1;
      recordsArray.sort((a, b) => b.score - a.score);
      Array.from(recordsArray).forEach(check => {
       var scores = document.createElement("div");
       scores.innerHTML = i + ". " + check.initialRecord + " - " + check.score;
       document.querySelector('#highScores div').appendChild(scores);
       i = i + 1
      });
      i = 0;
   
      document.querySelector("#initials").value = '';
     }
    });
   
   
    document.querySelector("#clearScores").addEventListener("click", () => {
     recordsArray = [];
     document.querySelector('#highScores div').innerHTML = "";
    });
   
   
    document.querySelector("#reset").addEventListener("click", () => {
     time = initialTime;
     score = 0;
     qCount = 0;
     qtitle.innerHTML = questions[qCount].title;
     q1.innerHTML = `1. ${questions[qCount].choices[0]}`;
     q2.innerHTML = `2. ${questions[qCount].choices[1]}`;
     q3.innerHTML = `3. ${questions[qCount].choices[2]}`;
     q4.innerHTML = `4. ${questions[qCount].choices[3]}`;
     let sections = document.querySelectorAll("section");
     Array.from(sections).forEach((userItem) => {
      userItem.classList.add('hide');
     });
     document.getElementById('intro').classList.remove('hide');
    });
   
   
   
   
    document.getElementById("scores").addEventListener("click", (e) => {
     e.preventDefault();
     clearInterval(clock);
     document.getElementById('time').innerHTML = 0;
     time = initialTime;
     score = 0;
     qCount = 0;
     qtitle.innerHTML = questions[qCount].title;
     q1.innerHTML = `1. ${questions[qCount].choices[0]}`;
     q2.innerHTML = `2. ${questions[qCount].choices[1]}`;
     q3.innerHTML = `3. ${questions[qCount].choices[2]}`;
     q4.innerHTML = `4. ${questions[qCount].choices[3]}`;
     let sections = document.querySelectorAll("section");
     Array.from(sections).forEach((userItem) => {
      userItem.classList.add('hide');
     });
     document.getElementById('highScores').classList.remove('hide');
    });
   
   
   });