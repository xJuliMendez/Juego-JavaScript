class Platform {

    constructor({izquierda, arriba, ancho, alto}) {

        this.derecha = izquierda + ancho
        this.base = arriba + alto
        this.ancho = ancho;
        this.alto = alto;
        this.izquierda = izquierda;
        this.arriba = arriba;
    }


    render() {
        c.fillStyle = "blue"
        c.fillRect(this.posicion.x, this.posicion.y, this.ancho, this.alto)
    }

}

class Player {

    cconstructor({izquierda, arriba}) {

        this.derecha = this.oDerecha = izquierda + ancho
        this.base = this.oBase = arriba + alto
        this.izquierda = this.oIzquierda = izquierda
        this.arriba = this.oArriba = arriba
        this.ancho = ancho
        this.alto = alto
    }


    update(g, f) { // gravity and friction

        this.vy += g; // you can make updates to velocity before or after the position update

        this.vx *= f; // I choose before so there isn't one frame of inactivity on the first cycle
        this.vy *= f;

        this.ob = this.b; // update the old positions to the current positions
        this.ol = this.l;
        this.or = this.r;
        this.ot = this.t;

        this.l += this.vx; // update the current positions to the new positions
        this.t += this.vy;
        this.r = this.l + this.w;
        this.b = this.t + this.h;

    }

}

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
        this.color = "red"
        this.haColisionado = false
    }

    ladoDerecho() {
        return Math.floor(this.posicion.x + this.ancho)
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

    izquierda() {
        this.velocidad.x = -5
    }

    // derecha(velocidad) {
    //     this.velocidad.x = velocidad
    // }
    //
    // izquierda(velocidad) {
    //     this.velocidad.x = -velocidad
    // }

    parar() {
        this.velocidad.x = 0
    }

}

class Plataforma {
    constructor({tipo, x, y, ancho, alto}) {
        this.tipo = tipo
        this.ancho = ancho
        this.alto = alto
        this.top = y
        this.izquierda = x
        this.bot = this.top + this.alto
        this.derecha = this.izquierda + this.ancho

    }

    render() {
        this.actualizar()
        c.fillStyle = "blue"
        c.fillRect(this.izquierda, this.top, this.ancho, this.alto)
    }

    actualizar(){
        this.bot = this.top + this.alto
        this.derecha = this.izquierda + this.ancho
    }

}