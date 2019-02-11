class Punto {
	
	constructor (x, y){
		this.x = x;
		this.y = y;
	}
	
	suma(a){
		var xfin = this.x + a.x;
		var yfin = this.y + a.y;
		
		return new Punto(xfin, yfin);
	}
}