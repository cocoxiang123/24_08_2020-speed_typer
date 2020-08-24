const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

//List of words for game
const words = [
  "sigh",
  "tense",
  "airplane",
  "ball",
  "pies",
  "juice",
  "warlike",
  "bad",
  "north",
  "dependent",
  "steer",
  "silver",
  "highfalutin",
  "superficial",
  "quince",
  "eight",
  "feeble",
  "admit",
  "drag",
  "loving",
];

//Init word
let randomWord;
//Init score
let score = 0;
//Init time
let time = 20;
//Init difficult
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";
//Set difficulty select value
difficultySelect.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";
//Focus on text on start
text.focus();

//Start counting down
const TimeInterval = setInterval(updateTime, 1000);

//Generate random word from array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}
//Add word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}
//Update score
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}
//Update time
function updateTime() {
  time--;
  timeEl.innerHTML = time + "s";

  if (time === 0) {
    clearInterval(TimeInterval);
    //end game
    gameOver();
  }
}

function gameOver() {
  endgameEl.innerHTML = `
    <h1>Time ran out </h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
    `;
  endgameEl.style.display = "flex";
}
addWordToDOM();

//Event listeners

//Typing words
text.addEventListener("input", (e) => {
  const insertedText = e.target.value;
  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();
    //Clear input
    e.target.value = "";
    switch (difficulty) {
      case "easy":
        time += 5;
        break;
      case "hard":
        time += 2;
        break;
      default:
        time += 3;
    }
  }
});

//Settings btn click
settingsBtn.addEventListener("click", () => {
  settings.classList.toggle("hide");
});

//Settings select
settingsForm.addEventListener("change", (e) => {
  difficult = e.target.value;
  console.log(difficult);
  localStorage.setItem("difficulty", difficult);
});
