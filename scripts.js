const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const highScoreBoard = document.querySelector('.highScore');
const moles = document.querySelectorAll('.mole');
const highScore = JSON.parse(localStorage.getItem('highScore')) || 0;
let lastHole;
let timeUp = false;
let score = 0;

randomTime = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
}

randomHole = (holes) => {
  const randomIndex = Math.floor(Math.random() * holes.length);
  const hole = holes[randomIndex];
  if(hole === lastHole) (randomHole(holes));
  lastHole = hole;
  return hole;
}

molePeep = () => {
  const time = randomTime(250, 1000);
  const hole = randomHole(holes);
  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
    if(!timeUp) molePeep();
  }, time);
}

setHighScore = (highScore = 0, highScoreBoard) => {
  localStorage.setItem('highScore', JSON.stringify(highScore));
  highScoreBoard.innerText = highScore;
}

startGame = () => {
  scoreBoard.textContent = 0;
  score = 0;
  timeUp = false;
  holes.forEach(hole => hole.classList.remove('up'))
  molePeep();
  setTimeout(() => {
    timeUp = true;
    holes.forEach(hole => hole.classList.add('up'));
  }, 10000);
}

function clickMole(e) {
  if(!e.isTrusted) return;
  score++;
  if(score>highScore) setHighScore(score, highScoreBoard);
  lastHole.classList.remove('up');
  scoreBoard.innerText = score;
}

moles.forEach( mole => mole.addEventListener('click', clickMole));
setHighScore(highScore, highScoreBoard);
