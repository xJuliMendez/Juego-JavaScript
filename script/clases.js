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

        this.hitboxAtaque = {
            posicion: {
                x: this.posicion.x,
                y: this.posicion.y
            },
            offset: {
                x: 50,
                y: -25
            },
            ancho: 50,
            alto: 50
        }
        this.estaAtacando = false
        this.haceDano = false

        this.animacionMuerte = false

        this.derecha = this.oDerecha = this.posicion.x + this.ancho
        this.base = this.oBase = this.posicion.y + this.altura

        this.saltos = 0
        this.sobrePlataforma = false
        this.haColisionado = false
    }

    render() {
        c.fillRect(this.posicion.x,
            this.posicion.y - this.altura,
            this.ancho,
            this.altura * 2)

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

                if (this.estaAtacando && (this.frameActual == 6 || this.frameActual == 7 || this.frameActual == 10 || this.frameActual == 11)) {
                    this.haceDano = true
                } else this.haceDano = false

                this.frameActual++

            } else {

                if (this.animacionMuerte) this.imagen.src = this.ruta + 11 + ".png"
                else this.frameActual = 1

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

        this.hitboxAtaque.posicion.x = this.posicion.x
        this.hitboxAtaque.posicion.y = this.posicion.y

        c.fillRect(this.hitboxAtaque.posicion.x + this.hitboxAtaque.offset.x, this.hitboxAtaque.posicion.y + this.hitboxAtaque.offset.y, this.hitboxAtaque.ancho, this.hitboxAtaque.alto)

        if ((this.base + this.velocidad.y <= canvas.height)) {
            this.velocidad.y += gravedad
        } else this.velocidad.y = 0


    }

    saltar() {
        this.velocidad.y = -12
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

        if (sprite == sprites.atacar) this.estaAtacando = true
        else this.estaAtacando = false

        if (sprite == sprite.muerte) this.animacionMuerte = true

        this.ruta = sprite.src
        this.framesMaxAnimacion = sprite.framesMaxAnimacion
        this.framesEspera = sprite.framesEspera
    }

}

class Jugador2 extends Sprite {
    constructor({
                    ruta,
                    posicion,
                    escala = 1,
                    framesHorizontales = 1,
                    framesMaxAnimacion = 6,
                    framesVerticales = 8,
                    margenSprite = {x: 0, y: 0}
                }) {

        super({
            ruta,
            posicion,
            escala,
            framesHorizontales,
            framesVerticales,
            margenSprite
        })

        this.oPosicion = {
            x: this.posicion.x,
            y: this.posicion.y
        }
        this.velocidad = {
            x: 0,
            y: 10
        }

        this.vida = 10

        this.posicionVertical = 0
        this.framesMaxAnimacion = framesMaxAnimacion
        this.frameActual = 0
        this.framesTranscurridos = 0
        this.framesEspera = 10

        this.ancho = this.imagen.width / this.framesHorizontales
        this.altura = this.imagen.height

        this.derecha = this.oDerecha = this.posicion.x + this.ancho
        this.base = this.oBase = this.posicion.y + this.altura

        this.saltos = 0
        this.sobrePlataforma = false
        this.haColisionado = false
    }

    render() {


        if (this.vida <= 0) {
            c.drawImage(new Image(), 0, 0, 0, 0)
        } else {
            c.drawImage(this.imagen,
                this.frameActual * (this.imagen.width / this.framesHorizontales),                     //posicion X inicial
                this.posicionVertical * (this.imagen.height / this.framesVerticales),                 //posicion Y inicial
                this.imagen.width / this.framesHorizontales,                    //tamañano del recorte, en este caso es la longitud entre el numero de frames de animacion dentro de la imagen
                this.imagen.height,                                     //alto del recorte
                this.posicion.x - this.margenSprite.x,                                        //posicion del canvas en la que se va a colocar
                this.posicion.y - this.margenSprite.y,
                (this.imagen.width / this.framesHorizontales) * this.escala,       //tamaño que se va a mostrar
                (this.imagen.height / this.framesVerticales) * this.escala)
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


        if ((this.base + this.velocidad.y <= canvas.height)) {
            this.velocidad.y += gravedad
        } else this.velocidad.y = 0


    }
}

class Plataforma {

    static ancho = 40.8  //24 ancho de los pixeles por 1.65 que es el escalado que he aplicado en la imagen
    static alto = 41

    constructor({
                    posicion,
                    encendida = false,
                    numeroDeHoguera = 0
                }) {

        this.posicion = {
            x: posicion.x,
            y: posicion.y
        }
        this.anchoPlataforma = 41
        this.altoPlataforma = 40

        this.encendida = encendida
        this.numeroDeHoguera = numeroDeHoguera

        this.top = this.posicion.y
        this.bot = this.posicion.y + this.altoPlataforma
    }

    render() {

        c.fillStyle = "rgba(0,255,0,0.0)"
        c.fillRect(this.posicion.x, this.posicion.y, this.anchoPlataforma, this.altoPlataforma)

    }

}