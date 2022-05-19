import { updateGround, setupGround } from "./ground.js"
import { updateCity, setupCity } from "./city.js"
import { updateDino, setupDino, getDinoRect, setDinoLose } from "./dino.js"
import { updateCactus, setupCactus, getCactusRects } from "./cactus.js"

const WORLD_WIDTH = 100
const WORLD_HEIGHT = 30
const SPEED_SCALE_INCREASE = 0.00001

const worldElem = document.querySelector("[data-world]")
const scoreElem = document.querySelector("[data-score]")
const startScreenElem = document.querySelector("[data-start-screen]")

setPixelToWorldScale()
window.addEventListener("resize", setPixelToWorldScale)
if(checkLose) {
  if(window.innerWidth > 978) {
    document.addEventListener("keydown", () => {
      handleStart()
    }, { once: true })
  }
  else {
    document.addEventListener("click", () => {
      handleStart()
    }, { once: true })
  }
}




let lastTime
let speedScale
let score
function update(time) {
  if (lastTime == null) {
    lastTime = time
    window.requestAnimationFrame(update)
    return
  }
  const delta = time - lastTime

  updateGround(delta, speedScale)
  updateCity(delta, speedScale)
  updateDino(delta, speedScale)
  updateCactus(delta, speedScale)
  updateSpeedScale(delta)
  updateScore(delta)
  if (checkLose()) return handleLose()

  lastTime = time
  window.requestAnimationFrame(update)
}

function checkLose() {
  const dinoRect = getDinoRect()
    return getCactusRects().some(rect => isCollision(rect, dinoRect))
}

function isCollision(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
  )
}

function updateSpeedScale(delta) {
  speedScale += delta * SPEED_SCALE_INCREASE
}

function updateScore(delta) {
  score += delta * 0.01
  scoreElem.textContent = Math.floor(score)
}

function handleStart() {
  lastTime = null
  speedScale = 1
  score = 0
  setupGround()
  setupCity()
  setupDino()
  setupCactus()
  startScreenElem.classList.add("hide")
  window.requestAnimationFrame(update)
}
const modal = document.getElementById('modal-one');
const playAgain = document.getElementById("playAgain");

function handleLose() {
  setDinoLose()

  setTimeout(() => {
    startScreenElem.classList.remove("hide")
    // Modal

    modal.classList.add('open');
    console.log('modal is opened')
    document.getElementsByClassName('score-span')[0].innerText = Math.floor(score)


  }, 100)

  playAgain.addEventListener('click', function () {
    modal.classList.remove('open');
  })
  playAgain.addEventListener("click", handleStart, { once: true })


  const exit = document.querySelector('.modal-exit');
  exit.addEventListener('click', function (event) {
    console.log('clicked!')
    event.preventDefault();
    modal.classList.remove('open');

    if(window.innerWidth > 978) {
      document.addEventListener("keydown", () => {
        handleStart()
      }, { once: true })
    }
    else {
      document.addEventListener("click", () => {
        handleStart()
      }, { once: true })
    }
  })

  const modalClose = document.getElementById('modal-close');
  modalClose.addEventListener('click', function (event) {
    event.preventDefault()
    modal.classList.remove('open')

    if(window.innerWidth > 978) {
      document.addEventListener("keydown", () => {
        handleStart()
      }, { once: true })
    }
    else {
      document.addEventListener("click", () => {
        handleStart()
      }, { once: true })
    }
  })

  let oldScore = localStorage.getItem('lrt_game_score');
  let newScore = score

  if(oldScore < newScore) {
    localStorage.setItem('lrt_game_score', newScore)
  }

  let payload =
      {
        phone: localStorage.getItem('lrt_game_phone'),
        lrt_game_nickname: localStorage.getItem('lrt_game_nickname'),
        lrt_game_score: parseInt(score)
      }

  fetch('https://api.dev.1fit.app/api/lead/lrt_game/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(payload)
  })
      .then((resp) => {
        console.log(resp)
      })
      .catch((error) => {
        console.log(error)
      });

}




function setPixelToWorldScale() {
  let worldToPixelScale

  if(window.innerWidth < 800) {
    worldElem.style.height = `380px`
  }

  worldElem.style.width = `100%`
  worldElem.style.height = `500px`
}
