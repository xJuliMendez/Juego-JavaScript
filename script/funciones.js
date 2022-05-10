const hoguera = document.querySelector(".hoguera")

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
    }
}

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
    q:{
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

    checkpoints.forEach(checkpoints =>{
        checkpoints.render()
    })

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
        if (teclas.abajo.pulsada) {

            if (teclas.arriba.pulsada) jugador.setSprite(sprites.saltarDerecha)
            else jugador.setSprite(sprites.agachar)
            jugador.velocidad.x = 0

        } else {

            if (teclas.izquierda.pulsada && jugador.posicion.x > 400 && !jugador.haColisionado) {
                desplazamiento -= 1
                if (teclas.arriba.pulsada) jugador.setSprite(sprites.saltarIzquierda)
                if (jugador.sobrePlataforma) jugador.setSprite(sprites.correrIzquierda)
                jugador.moverIzquierda()

            } else if (teclas.derecha.pulsada && jugador.posicion.x < 800 && !jugador.haColisionado) {
                desplazamiento += 5
                if (teclas.arriba.pulsada) jugador.setSprite(sprites.saltarDerecha)
                if (jugador.sobrePlataforma) jugador.setSprite(sprites.correrDerecha)
                jugador.moverDerecha()

            } else {

                if (teclas.arriba.pulsada) jugador.setSprite(sprites.saltarDerecha)
                if (jugador.sobrePlataforma) jugador.setSprite(sprites.quieto)
                jugador.parar()

                if (teclas.derecha.pulsada && !jugador.haColisionado) {
                    desplazamiento += 5
                    if (teclas.arriba.pulsada) jugador.setSprite(sprites.saltarDerecha)
                    if (jugador.sobrePlataforma) jugador.setSprite(sprites.correrDerecha)
                    tilemap.posicion.x -= 0.005
                    tienda.posicion.x -= 0.005
                    plataformas.forEach(plataforma => {
                        plataforma.posicion.x -= 0.005
                    })
                    checkpoints.forEach(cpoint =>{
                        cpoint.posicion.x -= 0.005
                    })
                }
                if (teclas.izquierda.pulsada && !jugador.haColisionado) {

                    if (teclas.arriba.pulsada) jugador.setSprite(sprites.saltarIzquierda)
                    if (jugador.sobrePlataforma) jugador.setSprite(sprites.correrIzquierda)
                    tilemap.posicion.x += 0.005
                    tienda.posicion.x += 0.005
                    plataformas.forEach(plataforma => {
                        plataforma.posicion.x += 0.005
                    })
                    checkpoints.forEach(cpoint =>{
                        cpoint.posicion.x += 0.005
                    })
                }
            }
        }

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


        //hitbox inferior de la plataforma
        if (jugador.derecha >= plataforma.posicion.x
            && jugador.posicion.x <= plataforma.posicion.x + plataforma.anchoPlataforma
            && jugador.base > plataforma.bot
            && jugador.posicion.y <= plataforma.bot + 100
            && jugador.posicion.y >= plataforma.posicion.y) {
            console.log("pabajo")
            jugador.velocidad.y += 0.5
        }
        //hitbox lateral de la plataforma desde abajo
        if ((jugador.derecha >= plataforma.posicion.x
                && jugador.posicion.x <= plataforma.posicion.x + plataforma.anchoPlataforma)
            && (jugador.posicion.y > plataforma.bot || jugador.base > plataforma.posicion.y)
            && !jugador.sobrePlataforma
        ) {
            console.log("quieto")
            jugador.haColisionado = true
        }

        // if (jugador.sobrePlataforma
        // &&(jugador.derecha >= plataforma.posicion.x
        //         && jugador.posicion.x <= plataforma.posicion.x + plataforma.anchoPlataforma)
        //     && jugador.base >= plataforma.top
        //     && jugador.posicion.y  <= plataforma.top){
        //     console.log("columna")
        //     jugador.haColisionado = true
        // }
        // if (((jugador.posicion.y >= plataforma.top && jugador.posicion.y <= plataforma.base)
        //         || (jugador.base >= plataforma.top && jugador.base <= plataforma.top))
        //     && (jugador.derecha >= plataforma.posicion.x || jugador.posicion.x <= plataforma.posicion.x + plataforma.anchoPlataforma)
        // ) {
        //     jugador.haColisionado = true
        // } else {
        //     jugador.haColisionado = false
        // }

    })

    checkpoints.forEach(cpoint =>{

        if ((jugador.derecha >= cpoint.posicion.x
            && jugador.posicion.x <= cpoint.posicion.x + cpoint.anchoPlataforma)){

            console.log("holi")

            hoguera.style.display = "block"

            addEventListener("keydown", ({key})=>{
                console.log(key)
                if (key == "q"){
                    hoguera.closest("div").innerText = "Lampara encendida. Punto de aparicion reestablecido"
                }
                hoguera.encendida = true
            })

        }else hoguera.style.display = "none"
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
            break
    }
})
addEventListener("keyup", ({key}) => {
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
})
