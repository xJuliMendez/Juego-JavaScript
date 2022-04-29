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

        // if (jugador.base + jugador.velocidad.y >= plataforma.top
        //     && jugador.derecha > plataforma.izquierda
        //     && jugador.posicion.x < plataforma.derecha) {
        //     jugador.sobrePlataforma = true
        //     jugador.velocidad.y = 0
        //     jugador.saltos = 0
        // }


    })

    plataformas.forEach(plataforma => {
        if (jugador.base <= plataforma.top
            && jugador.base + jugador.velocidad.y >= plataforma.top
            && jugador.derecha >= plataforma.izquierda
            && jugador.posicion.x <= plataforma.derecha) {
            jugador.sobrePlataforma = true
            jugador.velocidad.y = 0
        }

        if (teclas.izquierda.pulsada
            && jugador.posicion.x > 100
        ) {
            jugador.izquierda()
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

        if (jugador.derecha >= plataforma.izquierda){
            jugador.velocidad.x = 0
        }

        if (jugador.posicion.y <= plataforma.bot
        && jugador.base >= plataforma.bot
        && jugador.oDerecha >= plataforma.izquierda
        && jugador.oPosicion.x <= plataforma.derecha){
            jugador.velocidad.y = gravedad
        }



        if (jugador.posicion.y <= plataforma.bot
            && jugador.base >= plataforma.bot
            && (jugador.oDerecha <= plataforma.izquierda
            || jugador.oPosicion.x >= plataforma.derecha)
            && (jugador.derecha >= plataforma.izquierda || jugador.izquierda() <= plataforma.derecha)){
            console.log("quieto")
            jugador.velocidad.x = -4
        }


    })

    // plataformas.forEach(plataforma => {
    //
    //     // collideRectangle(rectangle) {

    //     //     }
    //     //
    //     // }
    //
    //     //hitbox
    //     if (jugador.ladoDerecho() >= plataforma.posicion.x //limitando la hitbox por la izquierda
    //         && jugador.posicion.x <= plataforma.posicion.x + plataforma.ancho //limitando la hitbox por la derecha
    //         && jugador.posicion.y < plataforma.bot //estoy debajo
    //         && jugador.base() > plataforma.top
    //     ) {
    //         jugador.velocidad.x = 0
    //     }
    //
    //     if (jugador.ladoDerecho() > plataforma.posicion.x //limitando la hitbox por la izquierda
    //         && jugador.posicion.x < plataforma.posicion.x + plataforma.ancho //limitando la hitbox por la derecha
    //         && jugador.posicion.y < plataforma.posicion.y + plataforma.alto //estoy debajo
    //         && jugador.base() >= plataforma.top
    //     ) {
    //         jugador.velocidad.y = gravedad
    //     }
    //
    //

    // })

}

//
// && jugador.base() + jugador.velocidad.y >= plataforma.posicion.y