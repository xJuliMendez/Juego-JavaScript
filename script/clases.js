class Jugador {
    constructor() {
        this.posicion = {
            x: 200,
            y: 100
        }
        this.velocidad = {
            x: 0,
            y: 10
        }
        this.ancho = 30
        this.altura = 30
        this.saltos = 0
        this.sobrePlataforma = false
        this.color = "red"
        this.haColisionado = false
    }

    ladoDerecho(){
        return Math.floor(this.posicion.x + this.ancho)
    }

    base() {
        return Math.floor(this.posicion.y + this.altura)
    }

    render() {
        c.fillStyle = this.color
        c.fillRect(this.posicion.x, this.posicion.y, this.ancho, this.altura)
    }

    actualizar() {
        this.render()

        this.posicion.y += this.velocidad.y
        this.posicion.x += this.velocidad.x

        if ((this.base() + this.velocidad.y < canvas.height)) {
            this.velocidad.y += gravedad
        } else this.velocidad.y = 0

    }

    saltar() {
        if (this.saltos == 1) this.velocidad.y = -10
        else this.velocidad.y = -13
    }

    derecha() {
        this.velocidad.x = 5
    }

    izquierda() {
        this.velocidad.x = -5
    }

    parar() {
        this.velocidad.x = 0
    }

}

class Plataforma {
    constructor({x,y}) {
        this.posicion = {
            x,
            y
        }

        this.ancho = 200
        this.alto = 50
        this.top = this.posicion.y
        this.bot = this.posicion.y + this.alto
        this.derecha = this.posicion.x+ this.ancho
        this.izquierda = this.posicion.x
    }

    render() {
        c.fillStyle = "blue"
        c.fillRect(this.posicion.x, this.posicion.y, this.ancho, this.alto)
    }

}