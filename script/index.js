const canvas = document.querySelector('canvas')

const c = canvas.getContext("2d")

canvas.width = innerWidth //darle al canvas el ancho de toda la
// pantalla se puede omitir la llamada al objeto ventana ya que heredamos de el

canvas.height = innerHeight

const gravedad = .6

const suelo = canvas.height

const jugador = new Jugador()

jugador.render()

console.log(canvas.height)

// const plataformas = mapa
animar()



