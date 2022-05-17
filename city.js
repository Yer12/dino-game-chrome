import {
    getCustomProperty,
    incrementCustomProperty,
    setCustomProperty,
} from "./updateCustomProperty.js"

const SPEED = 0.05
const cityElems = document.querySelectorAll("[data-city]")

export function setupCity() {
    setCustomProperty(cityElems[0], "--left", 0)
    setCustomProperty(cityElems[1], "--left", 300)
}

export function updateCity(delta, speedScale) {
    cityElems.forEach(city => {
        incrementCustomProperty(city, "--left", delta * speedScale * SPEED * -1)

        if (getCustomProperty(city, "--left") <= -300) {
            incrementCustomProperty(city, "--left", 600)
        }
    })
}
