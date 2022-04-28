const teclas = {
    derecha: {
        pulsada: false
    },
    izquierda: {
        pulsada: false
    }
}

function animar() {

    window.requestAnimationFrame(animar)
    c.clearRect(0, 0, canvas.width, canvas.height)

    jugador.actualizar()
    plataformas.forEach(plataforma => {
        plataforma.render()
    })


    if (teclas.izquierda.pulsada && jugador.posicion.x > 100) {
        console.log("izquierda")
        jugador.izquierda()
    } else if (teclas.derecha.pulsada && jugador.posicion.x < 800) {
        console.log("derecha")
        jugador.derecha()
    } else {
        jugador.parar()

        if (teclas.derecha.pulsada) {
            plataformas.forEach(plataforma => {
                plataforma.posicion.x -= 5
            })

        }

        if (teclas.izquierda.pulsada) {
            plataformas.forEach(plataforma => {
                plataforma.posicion.x += 5
            })

        }

    }

    plataformas.forEach(plataforma => {

        if (jugador.ladoDerecho() >= plataforma.posicion.x //limitando la hitbox por la izquierda
            && jugador.posicion.x <= plataforma.posicion.x + plataforma.ancho //limitando la hitbox por la derecha
            && jugador.posicion.y >= plataforma.posicion.y + plataforma.alto){
            console.log("colision")
            jugador.velocidad.y = gravedad
        }

        if (jugador.base() <= plataforma.posicion.y
            && jugador.base() + jugador.velocidad.y >= plataforma.posicion.y
            && jugador.ladoDerecho() >= plataforma.posicion.x
            && jugador.posicion.x < plataforma.posicion.x + plataforma.ancho) {
            jugador.sobrePlataforma = true
            jugador.velocidad.y = 0
            jugador.saltos = 0
        }
    })

}

//
// && jugador.base() + jugador.velocidad.y >= plataforma.posicion.y