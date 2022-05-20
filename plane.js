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
    setCustomProperty(planeElems[0], "--left", 800)
    setCustomProperty(planeElems[1], "--left", 1200)
    setCustomProperty(planeElems[2], "--left", 1400)
    setCustomProperty(planeElems[3], "--left", 1600)
    setCustomProperty(planeElems[4], "--left", 1800)
    setCustomProperty(planeElems[5], "--left", 2000)
}

export function updatePlane(delta, speedScale) {
    planeElems.forEach((plane, index) => {
        incrementCustomProperty(plane, "--left", delta * speedScale * SPEED * -1)

        if (getCustomProperty(plane, "--left") <= -200 * (index+1)) {
            incrementCustomProperty(plane, "--left", 200 * (index +1))
        }
    })
}
