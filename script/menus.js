let cargar = false

let menuDisponible = false

//elementos del html que se requieren para hacer los menus y los popups
const hogueraApagada = document.querySelector("#hogueraApagada")

const hogueraEncendida = document.querySelector("#hogueraEncendida")

const jugar = document.querySelector(".jugar")

const controles = document.querySelector(".controles")

const cerrarPopup = document.querySelectorAll(".cerrar")

const menuEsc = document.querySelector("#menuEsc")

const menuControles = document.querySelector("#menuControles")

const reiniciar = document.querySelector(".reiniciar")

const hasMuerto = document.querySelector(".hasmuerto")
hasMuerto.style.display = "none"

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


function victoria(){
    hasMuerto.style.display = "block"
    hasMuerto.classList.add("animacionMuerte")
    demo()
}

function reiniciarMapa(){

    let hogueraEncendida

    if (finalizado){
        checkpoints.forEach(cpoint =>{
            if (cpoint.encendida){
                hogueraEncendida = cpoint.numeroDeHoguera
            }
        })
    }

    cargar = true
    if (hogueraEncendida != null)localStorage.setItem("respawn", hogueraEncendida)

    if (reiniciando)
    {
        hasMuerto.style.display = "block"
        hasMuerto.classList.add("animacionMuerte")
        demo()
    }else demo(0)


}

//esta promesa nos permite simular un Thread sleep de Java
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo(tiempo = 4) {
    for (let i = 0; i < tiempo; i++) {
        await sleep(i * 1000);
    }

    localStorage.setItem("cargarMenu", false)
    location.reload()
}

//evento para poder empezar a jugar mas rapido pulsando Enter
addEventListener("keydown", ({key}) => {

    if (key === "Enter") {
        canvas.style.display = "block"
        intro.style.display = "none"
        menuDisponible = true
    }

})

//reiniciar el nivel desde el menu
reiniciar.addEventListener("click", ({key}) => {

    reiniciarMapa()

})

//dependiendo de como se quiere reiniciar el juego se guardan algunos valores en el local storage o no
window.onbeforeunload = () => {
    if (!cargar) {
        localStorage.clear()
    }
}


//evento que muestra el popup con los controles
controles.addEventListener("click", ()=>{

    menuControles.style.display = "block"
    menuControles.style.width = "30%"
    menuControles.style.height = "40vh"

})

//evento que nos permite cerrar los popup
cerrarPopup.forEach(cerrar => {

    cerrar.addEventListener("click", ()=>{
        cerrar.closest(".popup").style.display = "none"
        menuDisponible = true
    })

})


//muestra el menu al darle al escape
addEventListener("keydown", ({key}) => {

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

//evento que nos permite jugar al hacer click en jugar ahora en el menu principal
jugar.addEventListener("click", () => {
    canvas.style.display = "block"
    intro.style.display = "none"
    menuDisponible = true
})

