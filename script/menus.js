let cargar = false

let menuDisponible = false

const jugar = document.querySelector(".jugar")

const controles = document.querySelector(".controles")

const abrirPersonaje = document.querySelector(".historia")

const cerrarPopup = document.querySelectorAll(".cerrar")

const elegirPersonaje = document.querySelector("#elegirPersonaje")

const menuEsc = document.querySelector("#menuEsc")

const menuControles = document.querySelector("#menuControles")


const reiniciar = document.querySelector(".reiniciar")

const localStorage = window.localStorage

let cargarMenu = localStorage.getItem("cargarMenu")

if (cargarMenu) {
    canvas.style.display = "block"
    intro.style.display = "none"
    menuDisponible = true
} else {
    canvas.style.display = "none"
    menuDisponible = false
}


reiniciar.addEventListener("click", ({key}) => {
        cargar = true
        localStorage.setItem("cargarMenu", false)
        location.reload()

})

addEventListener("keydown", ({key}) => {

    if (key === "Enter") {
        canvas.style.display = "block"
        intro.style.display = "none"
        menuDisponible = true
    }

})

window.onbeforeunload = () => {
    if (!cargar) {
        localStorage.clear()
    }
}

abrirPersonaje.addEventListener("click", () => {
    elegirPersonaje.style.display = "block"
})

cerrarPopup.forEach(cerrar => {

    cerrar.addEventListener("click", ()=>{
        cerrar.closest(".popup").style.display = "none"
        menuDisponible = true
    })

})

controles.addEventListener("click", ()=>{

    menuControles.style.display = "block"
    menuControles.style.width = "30%"
    menuControles.style.height = "40vh"

})

addEventListener("keydown", ({key}) => {

    console.log(menuDisponible)

    if (key == "Escape") {
        if (menuDisponible) {
            menuEsc.style.display = "block"
            menuEsc.style.width = "20%"
            menuEsc.style.height = "50vh"
            menuDisponible = false
        } else {
            menuEsc.style.display = "none"
            menuDisponible = true
        }
    }

})

jugar.addEventListener("click", () => {
    canvas.style.display = "block"
    intro.style.display = "none"
    menuDisponible = true
})

