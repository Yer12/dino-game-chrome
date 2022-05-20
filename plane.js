import {
    getCustomProperty,
    incrementCustomProperty,
    setCustomProperty,
} from "./updateCustomProperty.js"

const SPEED = 0.0099999999999
const planeElems = document.querySelectorAll("[data-plane]")
const planeTexts = [
    'Just jump!',
    'уан фииит',
    'Беги,Лола,беги!',
    'Накачай пальцы ',
    'Работай руками! ',
    'Ты сможешь!',
    'Прыгай, Форест!',
    'Марио, ты супер!',
]


export function setupPlane() {
    setCustomProperty(planeElems[0], "--left", -100)

}
const plane = planeElems[0]
const planeText = document.getElementById('plane-text');
export function updatePlane(delta, speedScale) {

        incrementCustomProperty(plane, "--left", delta * speedScale * SPEED * -1)

        if (getCustomProperty(plane, "--left") <= -100) {
            incrementCustomProperty(plane, "--left", 200)
            planeText.innerText = planeTexts[Math.floor(Math.random() * planeTexts.length)]
        }
}
