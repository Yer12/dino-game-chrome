import {
  incrementCustomProperty,
  setCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js"

const dinoElem = document.querySelector("[data-dino]")
const JUMP_SPEED = 0.45
const GRAVITY = 0.0015
const DINO_FRAME_COUNT = 2
const FRAME_TIME = 100

let isJumping
let dinoFrame
let currentFrameTime
let yVelocity
export function setupDino() {
  isJumping = false
  dinoFrame = 0
  currentFrameTime = 0
  yVelocity = 0
  setCustomProperty(dinoElem, "--bottom", 0)
  document.removeEventListener("keydown", onJump)
  document.addEventListener("keydown", onJump)
  document.removeEventListener("click", handleonJump)
  document.addEventListener("click", handleonJump)
}

export function updateDino(delta, speedScale) {
  handleRun(delta, speedScale)
  handleJump(delta)
}

export function getDinoRect() {
  return dinoElem.getBoundingClientRect()
}

export function setDinoLose() {
  dinoElem.src = `imgs/dino.png`
  // console.log("dino is lose", dinoElem.src)
}
//
// function handleRun(delta, speedScale) {
//   if (isJumping) {
//     dinoElem.src = "imgs/dinorun.gif"
//
//     console.log("dino is jumping", dinoElem.src)
//     return
//   }
//
//   dinoElem.src = "imgs/dinorun.gif"
//   console.log("dino is staying", dinoElem.src)
//
//   currentFrameTime += delta * speedScale
// }

function handleRun(delta, speedScale) {
  if (isJumping) {
    dinoElem.src = `imgs/dino.png`
    return
  }
  else {
    dinoElem.src = `imgs/dinorun.gif`
  }

  // dinoElem.src = 'imgs/dinorun.gif';
}

function handleJump(delta) {
  if (!isJumping) return

  incrementCustomProperty(dinoElem, "--bottom", yVelocity * delta)

  if (getCustomProperty(dinoElem, "--bottom") <= 0) {
    setCustomProperty(dinoElem, "--bottom", 0)
    isJumping = false
  }

  yVelocity -= GRAVITY * delta
}

function onJump(e) {
  if (e.code !== "Space" || isJumping) return

  yVelocity = JUMP_SPEED
  isJumping = true
}


function handleonJump(e) {
  console.log(e)
  if (isJumping) return

  yVelocity = JUMP_SPEED
  isJumping = true
}
