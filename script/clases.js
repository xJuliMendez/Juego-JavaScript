class Jugador {
    constructor() {
        this.posicion = {
            x: 1000,
            y: 300
        }
        this.oPosicion = {
            x: this.posicion.x,
            y: this.posicion.y
        }
        this.velocidad = {
            x: 0,
            y: 10
        }

        this.ancho = 30
        this.altura = 30

        this.derecha = this.oDerecha = this.x + this.ancho
        this.base = this.oBase = this.posicion.y + this.altura

        this.saltos = 0
        this.sobrePlataforma = false
        this.color = "#FCBF49"
        this.haColisionado = false
    }

    render() {
        c.fillStyle = this.color
        c.fillRect(this.posicion.x, this.posicion.y, this.ancho, this.altura)
    }

    actualizar() {
        this.render()

        this.oPosicion.x = this.posicion.x
        this.oPosicion.y = this.posicion.y
        this.oBase = this.base
        this.oDerecha = this.derecha

        this.posicion.y += this.velocidad.y
        this.posicion.x += this.velocidad.x
        this.derecha = this.posicion.x + this.ancho
        this.base = this.posicion.y + this.altura


        if ((this.base + this.velocidad.y <= canvas.height)) {
            this.velocidad.y += gravedad
        } else this.velocidad.y = 0

    }

    saltar() {
        this.velocidad.y = -15
    }

    moverDerecha() {
        this.velocidad.x = 5
    }

    moverIzquierda() {
        this.velocidad.x = -5
    }

    parar() {
        this.velocidad.x = 0
    }

}


class Plataforma {

    static ancho = 69
    static alto = 72

    constructor({posicion}) {

        this.posicion = {
            x: posicion.x,
            y: posicion.y
        }
        this.anchoPlataforma = 69
        this.altoPlataforma = 72

        this.top = this.posicion.y
        this.bot = this.posicion.y + this.altoPlataforma
    }

    render() {

        c.fillStyle = "rgba(0,255,0,0.3)"
        c.fillRect(this.posicion.x, this.posicion.y, this.anchoPlataforma, this.altoPlataforma)

    }

}

class Sprite {
    constructor({imagen}) {

        this.posicion ={
            x:0,
            y:40
        }
        this.imagen = imagen

    }

    render(){
        c.drawImage(this.imagen, this.posicion.x, this.posicion.y)
    }

}