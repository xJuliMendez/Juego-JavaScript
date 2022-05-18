const velocidadPlataformas = 0.018
//sprites del jugador
const sprites = {
    quieto: {
        src: "/imagenes/sprites/jugador/idle/Warrior_Idle_",
        framesMaxAnimacion: 6,
        framesEspera: 10
    },
    correrDerecha: {
        src: "/imagenes/sprites/jugador/runRight/Warrior_Run_",
        framesMaxAnimacion: 8,
        framesEspera: 5
    },
    correrIzquierda: {
        src: "/imagenes/sprites/jugador/runLeft/Warrior_Run_",
        framesMaxAnimacion: 8,
        framesEspera: 5
    },
    agachar: {
        src: "/imagenes/sprites/jugador/agachar/Warrior_Crouch_",
        framesMaxAnimacion: 4,
        framesEspera: 15
    },
    saltarDerecha: {
        src: "/imagenes/sprites/jugador/saltarRight/Warrior_Jump_",
        framesMaxAnimacion: 3,
        framesEspera: 15
    },
    saltarIzquierda: {
        src: "/imagenes/sprites/jugador/saltarLeft/Warrior_Jump_",
        framesMaxAnimacion: 3,
        framesEspera: 15
    },
    atacar: {
        src: "/imagenes/sprites/jugador/atacar/Warrior_Attack_",
        framesMaxAnimacion: 12,
        framesEspera: 4
    },
    muerte: {
        src: "/imagenes/sprites/jugador/muerte/Warrior_Death_",
        framesMaxAnimacion: 11,
        framesEspera: 10
    }
}

//teclas que se usan durante la ejecucion
const teclas = {
    derecha: {
        pulsada: false
    },
    izquierda: {
        pulsada: false
    },
    abajo: {
        pulsada: false
    },
    arriba: {
        pulsada: false
    },
    q: {
        pulsada: false
    },
    m: {
        pulsada: false
    }
}

let reiniciando = false

let finalizado = false
let dentrofinal = false

function animar() {

    window.requestAnimationFrame(animar)
    c.clearRect(0, 0, canvas.width, canvas.height)

    c.drawImage(fondo1, 0, 0, canvas.width, canvas.height)
    c.drawImage(fondo2, 0, 0, canvas.width, canvas.height)
    c.drawImage(fondo3, 0, 0, canvas.width, canvas.height)

    tienda.actualizar()

    tilemap.render()

    plataformas.forEach(plataforma => {

        plataforma.render()

        //moviemiento del jugador
        if (teclas.m.pulsada) {
            jugador.setSprite(sprites.muerte)
        } else if (teclas.abajo.pulsada) {

            if (teclas.arriba.pulsada) jugador.setSprite(sprites.saltarDerecha)
            else jugador.setSprite(sprites.agachar)
            jugador.velocidad.x = 0

        } else if (teclas.q.pulsada) {
            jugador.parar()
            jugador.setSprite(sprites.atacar)

        } else {

            if (teclas.izquierda.pulsada && jugador.posicion.x > 400 && !jugador.haColisionado) {

                if (teclas.arriba.pulsada) jugador.setSprite(sprites.saltarIzquierda)
                if (jugador.sobrePlataforma) jugador.setSprite(sprites.correrIzquierda)
                jugador.moverIzquierda()

            } else if (teclas.derecha.pulsada && jugador.posicion.x < 800 && !jugador.haColisionado) {

                if (teclas.arriba.pulsada) jugador.setSprite(sprites.saltarDerecha)
                if (jugador.sobrePlataforma) jugador.setSprite(sprites.correrDerecha)
                jugador.moverDerecha()

            } else {

                if (teclas.arriba.pulsada) jugador.setSprite(sprites.saltarDerecha)
                if (jugador.sobrePlataforma) jugador.setSprite(sprites.quieto)
                jugador.parar()

                if (teclas.derecha.pulsada && !jugador.haColisionado) {

                    if (teclas.arriba.pulsada) jugador.setSprite(sprites.saltarDerecha)
                    if (jugador.sobrePlataforma) jugador.setSprite(sprites.correrDerecha)
                    tilemap.posicion.x -= velocidadPlataformas
                    tienda.posicion.x -= velocidadPlataformas
                    plataformas.forEach(plataforma => {
                        plataforma.posicion.x -= velocidadPlataformas
                    })
                    metas.forEach(meta => {
                        meta.posicion.x -= velocidadPlataformas
                    })
                    checkpoints.forEach(cpoint => {
                        cpoint.posicion.x -= velocidadPlataformas
                    })
                    magos.forEach(mago => {
                        mago.posicion.x -= velocidadPlataformas
                    })
                }
                if (teclas.izquierda.pulsada && !jugador.haColisionado) {

                    if (teclas.arriba.pulsada) jugador.setSprite(sprites.saltarIzquierda)
                    if (jugador.sobrePlataforma) jugador.setSprite(sprites.correrIzquierda)
                    tilemap.posicion.x += velocidadPlataformas
                    tienda.posicion.x += velocidadPlataformas
                    plataformas.forEach(plataforma => {
                        plataforma.posicion.x += velocidadPlataformas
                    })
                    checkpoints.forEach(cpoint => {
                        cpoint.posicion.x += velocidadPlataformas
                    })
                    metas.forEach(meta => {
                        meta.posicion.x += velocidadPlataformas
                    })
                    magos.forEach(mago => {
                        mago.posicion.x += velocidadPlataformas
                    })
                }
            }
        }

        metas.forEach(meta => {
            meta.render()

            if ((jugador.derecha >= meta.posicion.x
                && jugador.posicion.x <= meta.posicion.x + meta.anchoPlataforma)) {
                dentrofinal = true
            }

        })


        //hitbox superior de la plataforma

        if (jugador.base <= plataforma.top
            && jugador.base + jugador.velocidad.y >= plataforma.top
            && jugador.derecha >= plataforma.posicion.x
            && jugador.posicion.x <= plataforma.posicion.x + plataforma.anchoPlataforma
        ) {
            jugador.sobrePlataforma = true
            jugador.haColisionado = false
            jugador.velocidad.y = 0
        }

        magos.forEach(mago => {
            if (mago.base <= plataforma.top
                && mago.base + mago.velocidad.y >= plataforma.top) {
                mago.sobrePlataforma = true
                mago.haColisionado = true
                mago.velocidad.y = 0
            }
        })

    })

    magos.forEach(mago => {
        mago.actualizar()

    })

    jugador.actualizar()

    //funciones relacionadas con las lamparas
    checkpoints.forEach(cpoint => {

        cpoint.render()

        //muestra el texto para establecer el punto de aparicion
        if ((jugador.derecha >= cpoint.posicion.x
            && jugador.posicion.x <= cpoint.posicion.x + cpoint.anchoPlataforma)) {

            if (cpoint.encendida) {
                hogueraEncendida.classList.add("display")
            } else hogueraApagada.classList.add("display")


            addEventListener("keydown", ({key}) => {
                if (key === "r") {

                    console.log(jugador.derecha + " || " + cpoint.posicion.x)

                    if ((jugador.derecha >= cpoint.posicion.x
                        && jugador.posicion.x <= cpoint.posicion.x + cpoint.anchoPlataforma)) {
                        hogueraEncendida.classList.add("display")
                        hogueraApagada.classList.remove("display")
                        cpoint.encendida = true
                        checkpoints.forEach(points => {
                            if (points != cpoint) {
                                points.encendida = false
                            }
                        })
                    }

                }

            })

        } else if (jugador.derecha >= cpoint.posicion.x + cpoint.anchoPlataforma
            && jugador.posicion.x >= cpoint.posicion.x) {
            hogueraApagada.classList.remove("display")
            hogueraEncendida.classList.remove("display")
        }


    })

    //reiniciar el mapa y animacion de muerte
    if (jugador.base >= suelo - 2 && !reiniciando) {
        teclas.m.pulsada = true
        jugador.parar()
        jugador.animacionMuerte = true
        reiniciando = true
        finalizado = true
        reiniciarMapa()
    }

    //reiniciar el mapa y animacion de victoria
    if (dentrofinal) {
        hasMuerto.innerHTML = "<p>Victoria</p>"
        teclas.m.pulsada = true
        jugador.parar()
        jugador.animacionMuerte = true
        victoria()
    }
}


addEventListener("keydown", ({key}) => {

    if (!reiniciando) {
        switch (key) {
            case "w":
                teclas.arriba.pulsada = true
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
                    teclas.abajo.pulsada = true
                    jugador.ruta = sprites.agachar.src
                    jugador.framesMaxAnimacion = sprites.agachar.framesMaxAnimacion
                }
                break
            case "a":
                teclas.izquierda.pulsada = true
                break
            case "d":
                teclas.derecha.pulsada = true
                break
            case "q":
                teclas.q.pulsada = true
                magos.forEach(mago => {

                    if (
                        jugador.haceDano &&
                        jugador.hitboxAtaque.posicion.x + jugador.hitboxAtaque.ancho >= mago.posicion.x + 160
                        && jugador.hitboxAtaque.posicion.x <= mago.posicion.x + mago.ancho
                        && jugador.hitboxAtaque.posicion.y >= mago.posicion.y
                        && jugador.hitboxAtaque.posicion.y >= mago.base
                    ) {
                        mago.vida = mago.vida - 1
                    }

                })

                break
            case "i":
                console.log(jugador)
                console.log(magos)
                break
        }
    } else jugador.parar()

})
addEventListener("keyup", ({key}) => {
    if (!reiniciando) {
        switch (key) {
            case "w":
                teclas.arriba.pulsada = false
                break
            case "s":
                teclas.abajo.pulsada = false
                jugador.v = 5
                break
            case "a":
                teclas.izquierda.pulsada = false
                break
            case "d":
                teclas.derecha.pulsada = false
                break
            case "q":
                teclas.q.pulsada = false
                break
        }
    }
    jugador.parar()
})

