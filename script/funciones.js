const teclas = {
    derecha: {
        pulsada: false
    },
    izquierda: {
        pulsada: false
    }
}

addEventListener("keydown", ({key}) => {

    if (jugador.base >= suelo - 2) {
        console.log("suelo")
        jugador.haColisionado = false
        jugador.sobrePlataforma = false
        jugador.saltos = 0
    }
    switch (key) {
        case "w":
            if (jugador.saltos == 1) {
                jugador.saltar()
                jugador.saltos = 0
            }
            if ((jugador.base >= suelo || jugador.sobrePlataforma) && jugador.saltos == 0) {
                jugador.saltar()
                jugador.saltos = 1
                jugador.sobrePlataforma = false
            }
            break
        case "s":
            if (jugador.sobrePlataforma || jugador.base == suelo) {
                console.log(jugador)
                jugador.color = "#EAE2B7"
                jugador.v = 3
            }
            break
        case "a":
            teclas.izquierda.pulsada = true
            break
        case "d":
            teclas.derecha.pulsada = true
            break
    }
})
addEventListener("keyup", ({key}) => {
    switch (key) {
        case "s":
            jugador.color = "#FCBF49"
            jugador.v = 5
            break
        case "a":
            teclas.izquierda.pulsada = false
            break
        case "d":
            teclas.derecha.pulsada = false
            break
    }
})

function animar() {

    window.requestAnimationFrame(animar)
    c.clearRect(0, 0, canvas.width, canvas.height)


    jugador.actualizar()

    plataformas.forEach(plataforma => {

        plataforma.render()

        //moviemiento del jugador
        if (jugador.haColisionado) jugador.parar()
        else {
            if (teclas.izquierda.pulsada
                && jugador.posicion.x > 100
            ) {
                jugador.moverIzquierda()
            } else if (teclas.derecha.pulsada
                && jugador.posicion.x < 800
            ) {
                jugador.moverDerecha()
            } else {

                jugador.parar()

                if (teclas.derecha.pulsada) {
                    plataformas.forEach(plataforma => {
                        plataforma.izquierda -= 1
                    })
                }
                if (teclas.izquierda.pulsada) {
                    plataformas.forEach(plataforma => {
                        plataforma.izquierda += 1
                    })
                }
            }
        }

        //hitbox superior de la plataforma
        if (jugador.base <= plataforma.top
            && jugador.base + jugador.velocidad.y >= plataforma.top
            && jugador.derecha >= plataforma.izquierda
            && jugador.posicion.x <= plataforma.derecha) {
            jugador.sobrePlataforma = true
            jugador.velocidad.y = 0
            jugador.haColisionado = false
        }
        //hitbox inferior de la plataforma
        if (jugador.oPosicion.y <= plataforma.bot
            && jugador.oBase >= plataforma.bot
            && jugador.oDerecha >= plataforma.izquierda
            && jugador.oPosicion.x <= plataforma.derecha
            && !jugador.haColisionado) {
            console.log("pabajo")
            jugador.velocidad.y = gravedad
        }
        //hitbox lateral de la plataforma desde abajo
        if (jugador.base >= plataforma.top
            && jugador.posicion.y <= plataforma.bot
            && (jugador.oDerecha <= plataforma.izquierda || jugador.oPosicion.x >= plataforma.derecha)
            && (jugador.derecha >= plataforma.izquierda && jugador.posicion.x <= plataforma.derecha)) {
            console.log("quieto")
            jugador.haColisionado = true
        }

    })

}