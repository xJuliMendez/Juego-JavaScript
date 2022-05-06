const offset = {
    x: 0,
    y: 10
}

const fondo1 = new Image()
const fondo2 = new Image()
const fondo3 = new Image()
fondo1.src = "/imagenes/fondos/background_layer_1.png"
fondo2.src = "/imagenes/fondos/background_layer_2.png"
fondo3.src = "/imagenes/fondos/background_layer_3.png"

const tilemapImagen = new Image()
tilemapImagen.src = "/imagenes/mapa/Mapa.png"

const tilemap = new Sprite({imagen: tilemapImagen})

const mapaColisiones = []
for (let i = 0; i < colisiones.length; i += 265) {
    mapaColisiones.push(colisiones.slice(i, i + 265))
}

const plataformas = []

mapaColisiones.forEach((fila, i) => {
    fila.forEach((valor, j) => {
        if (valor == 318) {
            plataformas.push(new Plataforma({
                posicion: {
                    x: j * Plataforma.ancho + offset.x,
                    y: i * Plataforma.alto - offset.y
                }
            }))
        }
    })
})

console.log(plataformas)

const teclas = {
    derecha: {
        pulsada: false
    },
    izquierda: {
        pulsada: false
    }
}

var desplazamiento = 0


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

function animar() {

    window.requestAnimationFrame(animar)
    c.clearRect(0, 0, canvas.width, canvas.height)

    c.drawImage(fondo1, 0, 0, canvas.width, canvas.height)
    c.drawImage(fondo2, 0, 0, canvas.width, canvas.height)
    c.drawImage(fondo3, 0, 0, canvas.width, canvas.height)


    tilemap.render()


    plataformas.forEach(plataforma => {

        plataforma.render()

        //moviemiento del jugador

        if (teclas.izquierda.pulsada
            && jugador.posicion.x > 100
            && !jugador.haColisionado
        ) {
            jugador.moverIzquierda()
        } else if (teclas.derecha.pulsada
            && jugador.posicion.x < 800
            && !jugador.haColisionado
        ) {
            jugador.moverDerecha()
        } else {

            jugador.parar()

            if (teclas.derecha.pulsada
                && !jugador.haColisionado) {
                desplazamiento += 1
                tilemap.posicion.x -= 0.005
                plataformas.forEach(plataforma => {
                    plataforma.posicion.x -= 0.005
                })

            }
            if (teclas.izquierda.pulsada
                && !jugador.haColisionado) {
                desplazamiento -= 1
                tilemap.posicion.x += 0.005

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
        }else {
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

    jugador.actualizar()


    if (desplazamiento >= 2000) {
        // console.log("VICTORIA")

    }
}