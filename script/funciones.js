const sprites = {
    quieto:{
        src: "/imagenes/sprites/jugador/idle/Warrior_Idle_",
        framesMaxAnimacion: 6,
    },
    correr: {
        src: "/imagenes/sprites/jugador/run/Warrior_Run_",
        framesMaxAnimacion: 8,
    },
    agachar: {
        tileset: "tileSet2",
        framesMaxAnimacion: 3,
        posicionVertical: 9
    }
}

const teclas = {
    derecha: {
        pulsada: false
    },
    izquierda: {
        pulsada: false
    }
}

var desplazamiento = 0

let subiendoMapa = false

function animar() {

    window.requestAnimationFrame(animar)
    c.clearRect(0, 0, canvas.width, canvas.height)

    c.drawImage(fondo1, 0, 0, canvas.width, canvas.height)
    c.drawImage(fondo2, 0, 0, canvas.width, canvas.height)
    c.drawImage(fondo3, 0, 0, canvas.width, canvas.height)

    tienda.actualizar()

    jugador.actualizar()

    tilemap.render()


    plataformas.forEach(plataforma => {

        plataforma.render()

        // if (jugador.posicion.y >= 650) {
        //     tienda.posicion.y -= 0.01
        //     tilemap.posicion.y -= 0.01
        //     plataformas.forEach(plataforma => {
        //         plataforma.posicion.y -= 0.01
        //     })
        //     subiendoMapa = true
        //     jugador.margenSprite.y -= 1
        // }else subiendoMapa = false

        //moviemiento del jugador

        if (teclas.izquierda.pulsada
            && jugador.posicion.x > 400
            && !jugador.haColisionado
        ) {
            jugador.ruta = sprites.correr.src
            jugador.framesMaxAnimacion = sprites.correr.framesMaxAnimacion
            jugador.moverIzquierda()
        } else if (teclas.derecha.pulsada
            && jugador.posicion.x < 800
            && !jugador.haColisionado
        ) {
            jugador.ruta = sprites.correr.src
            jugador.framesMaxAnimacion = sprites.correr.framesMaxAnimacion
            jugador.moverDerecha()
        } else {

            jugador.ruta = sprites.quieto.src
            jugador.framesMaxAnimacion = sprites.quieto.framesMaxAnimacion
            jugador.parar()

            if (teclas.derecha.pulsada
                && !jugador.haColisionado) {
                jugador.ruta = sprites.correr.src
                jugador.framesMaxAnimacion = sprites.correr.framesMaxAnimacion
                desplazamiento += 1
                tilemap.posicion.x -= 0.005
                tienda.posicion.x -= 0.005
                plataformas.forEach(plataforma => {
                    plataforma.posicion.x -= 0.005
                })

            }
            if (teclas.izquierda.pulsada
                && !jugador.haColisionado) {
                jugador.ruta = sprites.correr.src
                jugador.framesMaxAnimacion = sprites.correr.framesMaxAnimacion
                desplazamiento -= 1
                tilemap.posicion.x += 0.005
                tienda.posicion.x += 0.005
                plataformas.forEach(plataforma => {
                    plataforma.posicion.x += 0.005

                })
            }
        }


        //hitbox superior de la plataforma

        if (jugador.base <= plataforma.top
            && jugador.base + jugador.velocidad.y >= plataforma.top
            && jugador.derecha >= plataforma.posicion.x
            && jugador.posicion.x <= plataforma.posicion.x + plataforma.anchoPlataforma
        ) {
            jugador.sobrePlataforma = true
            jugador.velocidad.y = 0
        }


        //hitbox inferior de la plataforma
        if (jugador.posicion.y <= plataforma.bot
            && jugador.base >= plataforma.bot
            && jugador.derecha >= plataforma.posicion.x
            && jugador.posicion.x <= plataforma.posicion.x + plataforma.anchoPlataforma
            && !jugador.haColisionado
        ) {
            console.log("pabajo")
            jugador.velocidad.y = 2
        }
        //hitbox lateral de la plataforma desde abajo
        if (jugador.base >= plataforma.top
            && jugador.posicion.y <= plataforma.bot
            && (jugador.derecha <= plataforma.posicion.x || jugador.posicion.x >= plataforma.posicion.x + plataforma.anchoPlataforma)
            && (jugador.derecha >= plataforma.posicion.x && jugador.posicion.x <= plataforma.posicion.x + plataforma.anchoPlataforma)
        ) {
            console.log("quieto")
            jugador.haColisionado = true
        } else {
            jugador.haColisionado = false
        }
        // if (((jugador.posicion.y >= plataforma.top && jugador.posicion.y <= plataforma.base)
        //         || (jugador.base >= plataforma.top && jugador.base <= plataforma.top))
        //     && (jugador.derecha >= plataforma.posicion.x || jugador.posicion.x <= plataforma.posicion.x + plataforma.anchoPlataforma)
        // ) {
        //     jugador.haColisionado = true
        // } else {
        //     jugador.haColisionado = false
        // }

    })


    if (desplazamiento >= 2000) {
        // console.log("VICTORIA")

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
            if (jugador.saltos === 1) {
                jugador.saltar()
                jugador.saltos = 0
            }
            if ((jugador.base >= suelo || jugador.sobrePlataforma) && jugador.saltos === 0) {
                jugador.saltar()
                jugador.saltos = 1
                jugador.sobrePlataforma = false
            }
            break
        case "s":
            if (jugador.sobrePlataforma || jugador.base === suelo) {
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

function crearImagen(ruta) {
    let imagen = new Image()
    imagen.src = ruta
    return imagen
}