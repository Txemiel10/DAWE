class ArrayOrdenado {
	constructor (comp){
		this.comp = comp
		this.contenido = []
	}

	findPos (nuevo) {
		
		if (this.contenido.findIndex(dato => this.comp(nuevo,dato)<0)==-1)
			return this.contenido.length
		else
			return this.contenido.findIndex(dato => this.comp(nuevo,dato)<0)
	}

	insert (elt) {
		
		this.contenido.splice(this.findPos(elt), 0, elt)
	}
}

var ordenado = new ArrayOrdenado((a, b) => { return a-b })
ordenado.insert(5)
ordenado.insert(1)
ordenado.insert(2)
ordenado.insert(4)
ordenado.insert(3)
console.log("array:", ordenado.contenido )
// array: [1, 2, 3, 4, 5]
