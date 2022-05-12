const canvas = document.querySelector('canvas')

const intro = document.querySelector('.intro')

const c = canvas.getContext("2d")

canvas.width = innerWidth //darle al canvas el ancho de toda la
// pantalla se puede omitir la llamada al objeto ventana ya que heredamos de el

canvas.height = innerHeight

const gravedad = .6

const suelo = canvas.height

const jugador = new Jugador({
    spriteSet: "/imagenes/sprites/jugador/idle/Warrior_Idle_",
    posicion: {
        x: 200,
        y: 200
    },
    escala: 2.5,
    margenSprite: {x: 50, y: 65}
})

// const player2 = new Jugador2({
//     ruta: "/imagenes/sprites/EVil Wizard 2/Sprites/Idle.png",
//     posicion: {
//         x: 200,
//         y: 400
//     },
//     escala: 2.5,
//     framesHorizontales: 8,
//     framesVerticales: 0,
//     margenSprite: {x: 50, y: 0}
// })


if (localStorage.getItem("respawn")) {


    tilemap.posicion.x -= posicionHogueras[localStorage.getItem("respawn")].x - jugador.posicion.x
    tienda.posicion.x -= posicionHogueras[localStorage.getItem("respawn")].x - jugador.posicion.x
    plataformas.forEach(plat => {
        plat.posicion.x -= posicionHogueras[localStorage.getItem("respawn")].x - jugador.posicion.x
    })
    checkpoints.forEach(cpoint => {
        cpoint.posicion.x -= posicionHogueras[localStorage.getItem("respawn")].x - jugador.posicion.x
    })

}

const magos = []



let mago1 = new Jugador2({
    ruta: "/imagenes/sprites/EVil Wizard 2/Sprites/Idle.png",
    posicion: {
        x: 800,
        y: 480
    },
    escala: 2,
    framesHorizontales: 8,
    framesVerticales: 1,
    margenSprite: {x: 0, y: 0}
})

let mago2 = new Jugador2({
    ruta: "/imagenes/sprites/EVil Wizard 2/Sprites/Idle.png",
    posicion: {
        x: 1800,
        y: 33
    },
    escala: 2,
    framesHorizontales: 8,
    framesVerticales: 1,
    margenSprite: {x: 0, y: 0}
})

let mago3 = new Jugador2({
    ruta: "/imagenes/sprites/EVil Wizard 2/Sprites/Idle.png",
    posicion: {
        x: 3650,
        y: 280
    },
    escala: 2,
    framesHorizontales: 8,
    framesVerticales: 1,
    margenSprite: {x: 0, y: 0}
})

let mago4 = new Jugador2({
    ruta: "/imagenes/sprites/EVil Wizard 2/Sprites/Idle.png",
    posicion: {
        x: 6200,
        y: 35
    },
    escala: 2,
    framesHorizontales: 8,
    framesVerticales: 1,
    margenSprite: {x: 0, y: 0}
})

magos.push(mago1,mago2,mago3,mago4)

console.log(magos)

animar()