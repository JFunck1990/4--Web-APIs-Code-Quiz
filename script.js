
//The questions

var questions = [
    {
      title: "Which of the following is correct about JQuery?",
      choices: ["The JQuery made it easy to select DOM elements, traverse them and modifying their content by using cross-browser open source selector engine called Sizzle.", "The JQuery helps you a lot to develop a responsive and feacher-rich site using AJAX technology.", "The JQuery comes with plenty of built-in animation effects which you can use in your websites.", "All of the above"],
      answer: "All of the above"
    },
    {
      title: "What are the two basic groups of data types in JavaScript?",
      choices: [
        "Primitive and attribute",
        "Primitive and reference types",
        "Reference types and attribute",
        "None of the above"
      ],
      answer: "Primitive and reference types"
    },
    {
      title: "Commonly used data types DO NOT include:",
      choices: ["strings", "booleans", "alerts", "numbers"],
      answer: "alerts"
    },
    {
      title: "Boolean operators that can be used in JavaScript include:",
      choices: [
        "'And' Operator &&",
        "'Or' Operator ||",
        "'Not' Operator !",
        "All the above"
      ],
      answer: "All the above"
    },
    {
      title:
        "JavaScript is a ___ -side programming language.",
      choices: [
        "None",
        "Both",
        "Server",
        "Client"
      ],
      answer: "Both"
    },
    {
      title: "How do you find the minimum of x and y using JavaScript?",
      choices: [
        "Math.min(x,y)",
        "min(x,y)",
        "Math.min(xy)",
        "All of the above"
      ],
      answer: "Math.min(x,y)"
    },
    {
      title: "The condition in an if / else statement is enclosed within ____.",
      choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
      answer: "parentheses"
    },
    {
      title: "Arrays in JavaScript can be used to store ____.",
      choices: [
        "numbers and strings",
        "other arrays",
        "booleans",
        "all of the above"
      ],
      answer: "all of the above"
    },
    {
      title:
        "String values must be enclosed within ____ when being assigned to variables.",
      choices: ["commas", "curly brackets", "quotes", "parentheses"],
      answer: "quotes"
    },
    {
      title:
        "Which JavaScript label catches all the values, except for the ones specified?",
      choices: ["catch", "label", "try", "default"],
      answer: "default"
    },
    {
      title: "What will the code return: Boolean(2 < 10)",
      choices: ["NaN", "SyntaxError", "False", "True"],
      answer: "True"
    }
  ];
 

  

  // DOM elements variablse
    var questionsEl = document.querySelector(
    "#questions");
   var timerEl = document.querySelector("#time");
   var choicesEl = document.querySelector(
    "#choices");
   var submitBtn = document.querySelector(
    "#submit");
   var startBtn = document.querySelector(
    "#start");
   var initialsEl = document.querySelector(
    "#initials");
   var feedbackEl = document.querySelector(
    "#feedback");
   
   // quiz  variables
   var currentQuestionIndex = 0;
   var time = questions.length * 15;
   var timerId;
   
   function startQuiz() {
    // hide start screen
    var startScreenEl = document.getElementById(
     "start-screen");
    startScreenEl.setAttribute("class", "hide");
    
    // unhide questions section
    questionsEl.removeAttribute("class");
    
    // start timer
    timerId = setInterval(clockTick, 1000);
    
    // show starting time
    timerEl.textContent = time;
    
    getQuestion();
   }
   
   function getQuestion() {
    // get current question object from array
    var currentQuestion = questions[
     currentQuestionIndex];
    
    // update title with current question
    var titleEl = document.getElementById(
     "question-title");
    titleEl.textContent = currentQuestion.title;
    
    // clear out any old question choices
    choicesEl.innerHTML = "";
    
    // loop over choices
    currentQuestion.choices.forEach(function(
     choice, i) {
     // create new button for each choice
     var choiceNode = document.createElement(
      "button");
     choiceNode.setAttribute("class",
     "choice");
     choiceNode.setAttribute("value", choice);
     
     choiceNode.textContent = i + 1 + ". " +
      choice;
     
     // attach click event listener to each choice
     choiceNode.onclick = questionClick;
     
     // display on the page
     choicesEl.appendChild(choiceNode);
    });
   }
   
   function questionClick() {
    // check if user guessed wrong
    if (this.value !== questions[
      currentQuestionIndex].answer) {
     // penalize time
     time -= 15;
     
     if (time < 0) {
      time = 0;
     }
     // display new time on page
     timerEl.textContent = time;
     feedbackEl.textContent = "Wrong!";
     feedbackEl.style.color = "red";
     feedbackEl.style.fontSize = "500%";
    } else {
     feedbackEl.textContent = "Correct!";
     feedbackEl.style.color = "green";
     feedbackEl.style.fontSize = "500%";
    }
    
    // flash right/wrong feedback
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function() {
     feedbackEl.setAttribute("class",
      "feedback hide");
    }, 1000);
    
    // next question
    currentQuestionIndex++;
    
    // time checker
    if (currentQuestionIndex === questions
     .length) {
     quizEnd();
    } else {
     getQuestion();
    }
   }
   
   function quizEnd() {
    // stop timer
    clearInterval(timerId);
    
    // show end screen
    var endScreenEl = document.getElementById(
     "end-screen");
    endScreenEl.removeAttribute("class");
    
    // show final score
    var finalScoreEl = document.getElementById(
     "final-score");
    finalScoreEl.textContent = time;
    
    // hide questions section
    questionsEl.setAttribute("class", "hide");
   }
   
   function clockTick() {
    // update time
    time--;
    timerEl.textContent = time;
    
    // check if user ran out of time
    if (time <= 0) {
     quizEnd();
    }
   }
   
   function saveHighscore() {
    // get value of input box
    var initials = initialsEl.value.trim();
    initialsEl.value = "";

    if (initials !== "") {
     // get saved scores from localstorage, if not any: set to empty array
     var highscores =
      JSON.parse(window.localStorage.getItem(
       "highscores")) || [];
     
     // format new score object for current user
     var newScore = {
      score: time,
      initials: initials
     };
     
     // save to localstorage
     highscores.push(newScore);
     window.localStorage.setItem("highscores",
      JSON.stringify(highscores));

      for(var i=0;i<highscores.length;i++){
        var li = document.createElement("li");
        li.textContent = highscores[i].initials + ": "+highscores[i].score;
        document.getElementById("highscores").append(li);
      }
     
     // redirect to next page
     //window.location.href = "score.html";
    }
   }
   
   function checkForEnter(event) {
    // "13" represents the enter key
    if (event.key === "Enter") {
     saveHighscore();
    }
   }

   function clearScore(){
    localStorage.clear();
    saveHighscore();
   }
   
   // submit initials
   submitBtn.onclick = saveHighscore;
   
   // start quiz
   startBtn.onclick = startQuiz;

   document.getElementById("clear").onclick = clearScore;
   
  
