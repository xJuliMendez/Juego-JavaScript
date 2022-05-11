const canvas = document.querySelector('canvas')

const intro = document.querySelector('.intro')

const c = canvas.getContext("2d")

canvas.width = innerWidth //darle al canvas el ancho de toda la
// pantalla se puede omitir la llamada al objeto ventana ya que heredamos de el

canvas.height = innerHeight

const gravedad = .6

const suelo = canvas.height


const jugador  = new Jugador({
    spriteSet: "/imagenes/sprites/jugador/idle/Warrior_Idle_",
    posicion: {
        x: 200,
        y: 200
    },
    escala: 3,
    margenSprite: {x: 50, y: 85}
})


if (localStorage.getItem("respawn")) {


    tilemap.posicion.x -= posicionHogueras[localStorage.getItem("respawn")].x - jugador.posicion.x
    plataformas.forEach(plat => {
        plat.posicion.x -= posicionHogueras[localStorage.getItem("respawn")].x - jugador.posicion.x
    })
    checkpoints.forEach(cpoint => {
        cpoint.posicion.x -= posicionHogueras[localStorage.getItem("respawn")].x - jugador.posicion.x
    })

}

animar()