document.addEventListener('DOMContentLoaded', (event) => {

    let initialTime = 60;
    let time = 20;
    let initialScore = 0;
    let score = 0;
    let qCount = 0;
    
    //Question Initial data
    //console.log(questions);
    //console.log(questions[0].choices[0]);
    document.querySelector('#quizHolder p').innerHTML = questions[0].title;
    document.querySelector('#quizHolder ol li:nth-of-type(1) div').innerHTML = `1. ${questions[qCount].choices[0]}`;
    document.querySelector('#quizHolder ol li:nth-of-type(2) div').innerHTML = `2. ${questions[qCount].choices[1]}`;
    document.querySelector('#quizHolder ol li:nth-of-type(3) div').innerHTML = `3. ${questions[qCount].choices[2]}`;
    document.querySelector('#quizHolder ol li:nth-of-type(4) div').innerHTML = `4. ${questions[qCount].choices[3]}`;
    
    let myTimer = () => {
      if(time > 0 ) {
      time = time - 1;
      document.getElementById('time').innerHTML = time;
    } else{
      clearInterval(clock);
      document.getElementById('score').innerHTML = score;
      document.getElementById('finish').classList.remove('hide');
      document.getElementById('quizHolder').classList.add('hide');
    }
    }
    
    let clock;
      document.querySelector("#intro button").addEventListener("click", (e) =>{
          document.getElementById('intro').classList.add('hide');
          document.getElementById('quizHolder').classList.remove('hide');
          clock = setInterval(myTimer, 1000);
    });
    
    let answers = document.querySelectorAll('#quizHolder ol li div');
    
    Array.from(answers).forEach(check => {
      check.addEventListener('click', function(event) {
        if( this.innerHTML.substring(3,this.length) === questions[qCount].answer ){
        console.log(questions[qCount].answer);
        console.log(this.innerHTML.substring(3,this.length));
        }
      });
    });
    
    
    /*document.querySelectorAll('#quizHolder ol li:nth-of-type(1) div').addEventListener("click", (e) =>{
      console.log(e.target.innerHTML);
    });*/
    
    
    
    
    
    
    
    });