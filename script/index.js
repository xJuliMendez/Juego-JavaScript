const canvas = document.querySelector('canvas')

const c = canvas.getContext("2d")

canvas.width = innerWidth //darle al canvas el ancho de toda la
// pantalla se puede omitir la llamada al objeto ventana ya que heredamos de el

canvas.height = innerHeight

const gravedad = .6

const suelo = canvas.height

const jugador = new Jugador()

jugador.render()

const plataformas = [new Plataforma({x:400,y:450}), new Plataforma({x: 800, y:400})]

animar()

addEventListener("keydown", ({key}) => {

    console.log("base " + jugador.base())
    console.log("suelo " + suelo)
    console.log("Esta sobre plataforma " + jugador.sobrePlataforma)
    console.log("saltos " + jugador.saltos)
    plataformas.forEach(plataforma =>{
        console.log("base plataforma " + (plataforma.posicion.y + plataforma.alto))
        console.log("plataforma x " + plataforma.posicion.x)
        console.log("plataforma y " + plataforma.posicion.y)
    })
    if (jugador.base() == suelo) {
        jugador.sobrePlataforma = false
        jugador.saltos = 0
    }
    switch (key) {
        case "w":
            if (jugador.saltos == 1) {
                jugador.saltar()
                jugador.saltos = 0
            }
            if ((jugador.base() >= suelo || jugador.sobrePlataforma) && jugador.saltos == 0) {
                jugador.saltar()
                jugador.saltos = 1
                jugador.sobrePlataforma = false
            }
            break
        case "s":
            if (jugador.sobrePlataforma || jugador.base() == suelo) {
                jugador.color = "green"
            }
            break
        case "a":
            console.log(jugador.posicion.x)
            teclas.izquierda.pulsada = true
            break
        case "d":
            console.log(jugador.posicion.x)
            teclas.derecha.pulsada = true
            break
    }
})
addEventListener("keyup", ({key}) => {
    switch (key) {
        case "s":
            jugador.color = "red"
            break
        case "a":
            teclas.izquierda.pulsada = false
            break
        case "d":
            teclas.derecha.pulsada = false
            break
    }
})



