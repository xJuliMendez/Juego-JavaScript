const canvas = document.querySelector('canvas')

const intro = document.querySelector('.intro')

const c = canvas.getContext("2d")

canvas.width = innerWidth

canvas.height = innerHeight

const gravedad = .6

const suelo = canvas.height

//creamos el jugador
const jugador = new Jugador({
    spriteSet: "/imagenes/sprites/jugador/idle/Warrior_Idle_",
    posicion: {
        x: 200,
        y: 200
    },
    escala: 2.5,
    margenSprite: {x: 50, y: 65}
})

//array con las posiciones iniciales de los magos
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
            magos.push(new Mago({
                ruta: "/imagenes/sprites/mago/Sprites/Idle.png",
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


//en caso de haber muerto esto nos permite cargar el mapa desde la ultima lampara con el mapa desplazado
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
    metas.forEach(meta =>{
        meta.posicion.x -= posicionHogueras[localStorage.getItem("respawn")].x - jugador.posicion.x
    })
}

animar()