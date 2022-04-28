window.onload = () => {

    const canvas = document.querySelector('canvas')

    const c = canvas.getContext("2d")

    canvas.width = innerWidth //darle al canvas el ancho de toda la
    // pantalla se puede omitir la llamada al objeto ventana ya que heredamos de el

    canvas.height = innerHeight

    class Jugador {
        constructor() {
            this.posicion = {
                x: 100,
                y: 100
            }
            this.ancho = 30
            this.altura = 30
        }

        render() {
            c.fillStyle = "red"
            c.fillRect(this.posicion.x, this.posicion.y, this.ancho, this.altura)
        }

    }

    const jugador = new Jugador()
    jugador.render()

}

