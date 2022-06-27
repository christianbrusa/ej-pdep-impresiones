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