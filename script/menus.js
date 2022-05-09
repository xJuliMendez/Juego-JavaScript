let rPulsada = false

const localStorage = window.localStorage

const abrirPopup = document.querySelector(".historia")
const popup = document.querySelector("#popup")

let cargarMenu = localStorage.getItem("cargarMenu")

if (cargarMenu) {
    canvas.style.display = "block"
    intro.style.display = "none"
} else canvas.style.display = "none"

addEventListener("keydown", ({key}) => {
    if (key === "r") {
        rPulsada = true
        localStorage.setItem("cargarMenu", false)
        location.reload()
    }

})

window.onbeforeunload = () => {
    if (!rPulsada) {
        localStorage.clear()
    }
}

abrirPopup.addEventListener("click", ()=>{
    popup.style.display = ""
})
