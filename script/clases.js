class Sprite {
    constructor({
                    ruta = "",
                    posicion,
                    escala = 1,
                    framesHorizontales = 1,
                    framesMaxAnimacion = 1,
                    framesVerticales = 1,
                    posicionVertical = 0,
                    margenSprite = {x: 0, y: 0}
                }) {

        this.posicion = {
            x: posicion.x,
            y: posicion.y
        }
        this.imagen = new Image()
        this.imagen.src = ruta
        this.escala = escala
        this.posicionVertical = posicionVertical
        this.framesHorizontales = framesHorizontales
        this.framesMaxAnimacion = framesMaxAnimacion
        this.framesVerticales = framesVerticales
        this.frameActual = 0
        this.framesTranscurridos = 0
        this.framesEspera = 10
        this.margenSprite = margenSprite
    }

    render() {
        c.drawImage(this.imagen,
            this.frameActual * (this.imagen.width / this.framesHorizontales),                                                  //posicion X inicial
            this.posicionVertical * (this.imagen.height / this.framesVerticales),                                                  //posicion Y inicial
            this.imagen.width / this.framesHorizontales,                    //tamañano del recorte, en este caso es la longitud entre el numero de frames de animacion dentro de la imagen
            this.imagen.height / this.framesVerticales,                                     //alto del recorte
            this.posicion.x - this.margenSprite.x,                                        //posicion del canvas en la que se va a colocar
            this.posicion.y - this.margenSprite.y,
            (this.imagen.width / this.framesHorizontales) * this.escala,       //tamaño que se va a mostrar
            (this.imagen.height / this.framesVerticales) * this.escala)
    }

    actualizarFrames() {
        this.framesTranscurridos++

        if (this.framesTranscurridos % this.framesEspera === 0) {

            if (this.frameActual < this.framesMaxAnimacion - 1) {
                this.frameActual++
            } else {
                this.frameActual = 0
            }
        }
    }

    actualizar() {
        this.render()
        this.actualizarFrames()
    }

}

class Jugador extends Sprite {
    constructor({
                    spriteSet,
                    posicion,
                    escala = 3,
                    framesMaxAnimacion = 6,
                    margenSprite = {x: 0, y: 0}
                }) {

        super({
            posicion,
            escala,
            margenSprite
        })

        this.imagen = new Image()
        this.imagen.src = spriteSet + "1.png"
        this.ruta = spriteSet

        this.oPosicion = {
            x: this.posicion.x,
            y: this.posicion.y
        }
        this.velocidad = {
            x: 0,
            y: 10
        }

        this.framesMaxAnimacion = framesMaxAnimacion
        this.frameActual = 1
        this.framesTranscurridos = 0
        this.framesEspera = 10

        this.ancho = this.imagen.width
        this.altura = this.imagen.height

        this.derecha = this.oDerecha = this.posicion.x + this.ancho
        this.base = this.oBase = this.posicion.y + this.altura

        this.saltos = 0
        this.sobrePlataforma = false
        this.haColisionado = false
    }

    render() {
        c.fillStyle = "rgba(0,255,0,0.4)"
        c.fillRect(this.posicion.x,
            this.posicion.y-this.altura,
            this.ancho,
            this.altura*2)

        c.drawImage(this.imagen,
            this.posicion.x - this.margenSprite.x,                                        //posicion del canvas en la que se va a colocar
            this.posicion.y - this.margenSprite.y,
            this.ancho * this.escala,
            this.altura * this.escala)
    }

    actualizarFrames() {
        this.framesTranscurridos++

        if (this.framesTranscurridos % this.framesEspera === 0) {

            if (this.frameActual < this.framesMaxAnimacion - 1) {
                this.imagen.src = this.ruta + this.frameActual + ".png"
                this.frameActual++
            } else {
                this.frameActual = 1
            }
        }
    }

    actualizar() {
        this.render()
        this.actualizarFrames()

        this.oPosicion.x = this.posicion.x
        this.oPosicion.y = this.posicion.y
        this.oBase = this.base
        this.oDerecha = this.derecha

        this.posicion.y += this.velocidad.y
        this.posicion.x += this.velocidad.x
        this.derecha = this.posicion.x + this.ancho
        this.base = this.posicion.y + this.altura


        if ((this.base + this.velocidad.y <= canvas.height) && !subiendoMapa) {
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

    setSprite(sprite) {
        this.ruta = sprite.src
        this.framesMaxAnimacion = sprite.framesMaxAnimacion
        this.framesEspera = sprite.framesEspera
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

        c.fillStyle = "rgba(0,255,0,0.4)"
        c.fillRect(this.posicion.x, this.posicion.y, this.anchoPlataforma, this.altoPlataforma)

    }

}
