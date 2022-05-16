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

let posiciones = [{
    x:800,
    y:447
},{
    x: 1800,
    y: 30
},{
    x: 3650,
    y: 280
},{
    x: 6100,
    y: 35
}]

const magos = []

for (let i = 0; i < posiciones.length; i++) {
            magos.push(new Jugador2({
                ruta: "/imagenes/sprites/EVil Wizard 2/Sprites/Idle.png",
                posicion: {
                    x: posiciones[i].x,
                    y: posiciones[i].y
                },
                escala: 2,
                framesHorizontales: 8,
                framesVerticales: 1,
                margenSprite: {x: 0, y: 5}
            }))
    if (i == 0){
        magos[0].margenSprite.y = -35
    }
}


if (localStorage.getItem("respawn")) {


    tilemap.posicion.x -= posicionHogueras[localStorage.getItem("respawn")].x - jugador.posicion.x
    tienda.posicion.x -= posicionHogueras[localStorage.getItem("respawn")].x - jugador.posicion.x
    plataformas.forEach(plat => {
        plat.posicion.x -= posicionHogueras[localStorage.getItem("respawn")].x - jugador.posicion.x
    })
    checkpoints.forEach(cpoint => {
        cpoint.posicion.x -= posicionHogueras[localStorage.getItem("respawn")].x - jugador.posicion.x
    })
    magos.forEach(mago =>{
        mago.posicion.x -= posicionHogueras[localStorage.getItem("respawn")].x - jugador.posicion.x
    })
}

animar()