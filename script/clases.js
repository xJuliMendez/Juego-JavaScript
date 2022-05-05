class Jugador {
    constructor() {
        this.posicion = {
            x: 200,
            y: 100
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
        this.velocidad.y = -10
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

        this.posicion = posicion
        this.anchoPlataforma = 72
        this.altoPlataforma = 72

        this.izquierda = this.posicion.x
        this.derecha = this.posicion.x + this.anchoPlataforma
        this.top = this.posicion.y
        this.bot = this.posicion.y + this.altoPlataforma
    }

    render(){
        c.fillStyle = "rgba(255,0,0,1)"
        console.log(c)
        c.fillRect(this.posicion.x -offset.x, this.posicion.y - offset.y -50, this.ancho, this.alto)    }

}