const canvas = document.querySelector('canvas')

const c = canvas.getContext("2d")

canvas.width = innerWidth //darle al canvas el ancho de toda la
// pantalla se puede omitir la llamada al objeto ventana ya que heredamos de el

canvas.height = innerHeight

const gravedad = .6

const suelo = canvas.height

const jugador = new Jugador({
    ruta: "/imagenes/sprites/jugador/red/char_red_1.png",
    posicion: {
        x: 1100,
        y: 200
    },
    escala: 3,
    framesHorizontales: 8,
    framesVerticales: 11,
    margenSprite: {x: 50, y: 110},
    // sprites: sprites
})


animar()



