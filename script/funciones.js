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
        jugador.izquierda()
    } else if (teclas.derecha.pulsada && jugador.posicion.x < 800) {
        jugador.moverDerecha()
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

        // collideRectangle(rectangle) {
        //
        //     if (this.b < rectangle.t || this.t > rectangle.b || this.l > rectangle.r || this.r < rectangle.l) return;
        //
        //     /* You can only collide with one side at a time, so "else if" is just fine. You don't need to separate the checks for x and y. Only one check can be true, so only one needs to be done. Once it's found, the other's don't need to be done. */
        //     if (this.b >= rectangle.t && this.ob < rectangle.ot) {
        //
        //         this.setBase(rectangle.t - 0.1);
        //         this.vy = rectangle.vy; // the platform moves the player with it after collision...
        //         this.jumping = false;
        //
        //     } else if (this.t <= rectangle.b && this.ot > rectangle.ob) {
        //
        //         this.setTop(rectangle.b + 0.1);
        //         this.vy = rectangle.vy; // ... regardless of what side the player collides with
        //
        //     } else if (this.r >= rectangle.l && this.or < rectangle.ol) {
        //
        //         this.setDer(rectangle.l - 0.1);
        //         this.vx = rectangle.vx;
        //
        //     } else if (this.l <= rectangle.r && this.ol > rectangle.or) {
        //
        //         this.setIzq(rectangle.r + 0.1);
        //         this.vx = rectangle.vx;
        //
        //     }
        //
        // }

        //hitbox
        if (jugador.ladoDerecho() >= plataforma.posicion.x //limitando la hitbox por la izquierda
            && jugador.posicion.x <= plataforma.posicion.x + plataforma.ancho //limitando la hitbox por la derecha
            && jugador.posicion.y < plataforma.bot //estoy debajo
            && jugador.base() > plataforma.top
        ) {
            jugador.velocidad.x = 0
        }

        if (jugador.ladoDerecho() > plataforma.posicion.x //limitando la hitbox por la izquierda
            && jugador.posicion.x < plataforma.posicion.x + plataforma.ancho //limitando la hitbox por la derecha
            && jugador.posicion.y < plataforma.posicion.y + plataforma.alto //estoy debajo
            && jugador.base() >= plataforma.top
        ) {
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