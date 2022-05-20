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
    setCustomProperty(planeElems[0], "--left", -50)

}
const plane = planeElems[0]
const planeText = document.getElementById('plane-text');
export function updatePlane(delta, speedScale) {

        incrementCustomProperty(plane, "--left", delta * speedScale * SPEED * -1)

        if (getCustomProperty(plane, "--left") <= -50) {
            console.log(getCustomProperty(plane, "--left"))
            incrementCustomProperty(plane, "--left", 100)
            planeText.innerText = planeTexts[parseInt(getCustomProperty(plane, "--left")) / 150]
        }
}
