class Usuario {

    pedidoDeImpresion(documento) {

    }

}


class Administrador extends Usuario {

    constructor(listadoDeServidores) {
        super();
        this.listadoDeServidores = listadoDeServidores;
    }

    pedidoDeImpresion(documento) {
        let estaDisponible = (servidor) => servidor.puedeAceptar(documento);
        let servidoresDisponibles = this.listadoDeServidores.filter(estaDisponible);
        //console.log(servidoresDisponibles);
        return servidoresDisponibles[0].listadoDeImpresoras[0].puedeImprimir(documento);
    }
}


class Comun extends Usuario {

    constructor(listadoDeServidores) {
        super();
        this.listadoDeServidores = listadoDeServidores;
    }

    pedidoDeImpresion(documento) {
        let estaDisponible = (servidor) => servidor.puedeAceptar(documento);
        let servidoresDisponibles = this.listadoDeServidores.filter(estaDisponible);
        //console.log(servidoresDisponibles);
        return servidoresDisponibles[0].listadoDeImpresoras[0].puedeImprimir(documento);
    }
}

class Servidor {

    constructor(listadoDeImpresoras) {
        this.listadoDeImpresoras = listadoDeImpresoras;
    }

    puedeAceptar(documento) {
        return this.listadoDeImpresoras.some(impresora => impresora.constructor.name == "ImpresoraFotos" && documento.constructor.name == "ArchivoDeImagen" ||
            impresora.constructor.name == "ImpresoraLibros" && documento.constructor.name == "Libro");
    }
}

class Impresora {

    pesoTotalCola(impresora) {
        let total = 0;

        impresora.cola.forEach(function(documento) {
            total += documento.peso();
        })
        return total;
    }
}

class ImpresoraGeneral extends Impresora {

    constructor(cargaMaxima, cola) {
        super();
        this.cargaMaxima = cargaMaxima;
        this.cola = cola;
    }

    puedeImprimir(documento) {
        if (documento instanceof ArchivoDeImagen || documento instanceof Libro) {
            if ((documento.peso() + this.pesoTotalCola(this)) < this.cargaMaxima) {
                console.log("imprimiendo...");
                return true;
            } else {
                console.log("No puede imprimir ya que su peso sobrepasa la carga maxima");
                return false;
            }
        } else {
            console.log("No puedo imprimir este tipo de archivo");
        }
    }
}

class ImpresoraFotos extends Impresora {

    constructor(cargaMaxima, cola) {
        super();
        this.cargaMaxima = cargaMaxima;
        this.cola = cola;
    }

    puedeImprimir(documento) {
        if (documento instanceof ArchivoDeImagen) {
            if ((documento.peso() + this.pesoTotalCola(this)) < this.cargaMaxima) {
                console.log("imprimiendo...");
                return true;
            } else {
                console.log("No puede imprimir ya que su peso sobrepasa la carga maxima");
                return false;
            }
        } else {
            console.log("No puedo imprimir este tipo de archivo");
        }
    }
}

class ImpresoraLibros extends Impresora {

    constructor(cargaMaxima, cola) {
        super();
        this.cargaMaxima = cargaMaxima;
        this.cola = cola;
    }

    puedeImprimir(documento) {
        if (documento instanceof Libro) {
            if ((documento.peso() + this.pesoTotalCola(this)) < this.cargaMaxima) {
                console.log("imprimiendo...");
                return true;
            } else {
                console.log("No puede imprimir ya que su peso sobrepasa la carga maxima");
                return false;
            }
        } else {
            console.log("No puedo imprimir este tipo de archivo");
        }
    }
}

class Documento {

    peso() {

    }
}

class Libro extends Documento {

    constructor(cantidadPaginas) {
        super();
        this.cantidadPaginas = cantidadPaginas;
    }

    peso() {
        return this.cantidadPaginas / 10;
    }
}


class ArchivoDeImagen extends Documento {

    constructor(tamanioArchivo) {
        super();
        this.tamanioArchivo = tamanioArchivo;
    }

    peso() {
        let rangoPeso1 = 100;
        let rangoPeso2 = 300;
        let valor = 0;

        this.tamanioArchivo < rangoPeso1 ?
            valor = 1 :
            ((this.tamanioArchivo >= rangoPeso1 && this.tamanioArchivo < rangoPeso2) ?
                valor = 2 : valor = 3)
        return valor;
    }
}

const doc1 = new Libro(20);
doc1.peso();

const doc2 = new ArchivoDeImagen(99);
doc2.peso();

const imp1 = new ImpresoraFotos(50, [doc1, doc2]);
const imp2 = new ImpresoraLibros(100, []);

//imp1.puedeImprimir(doc2);

const servidorPalermo = new Servidor([imp1]);
const servidorChacarita = new Servidor([imp2]);

servidorPalermo.puedeAceptar(doc1);
servidorPalermo.puedeAceptar(doc2);

const pepe = new Administrador([servidorPalermo, servidorChacarita]);
pepe.pedidoDeImpresion(doc2);