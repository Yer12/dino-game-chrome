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
    'Беги, Лола, беги!',
    'Накачай пальцы ',
    'Работай руками! ',
    'Ты сможешь!',
    'Прыгай, Форест!',
    'Марио, ты супер!',
]


export function setupPlane() {
    setCustomProperty(planeElems[0], "--left", -700)
    // setCustomProperty(planeElems[1], "--left", 300)
}

export function updatePlane(delta, speedScale) {
    console.log('delta:',delta, 'speedScale:',speedScale, 'speed:',SPEED)
    planeElems.forEach(plane => {
        incrementCustomProperty(plane, "--left", delta * speedScale * SPEED * -1)

        if (getCustomProperty(plane, "--left") <= -300) {
            incrementCustomProperty(plane, "--left", 600)
        }
    })
}
