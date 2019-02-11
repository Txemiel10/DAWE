function Punto(x, y)
	{ 
				this.x = x;
				this.y = y;

			Punto.prototype.suma = function(a)
			{	
				resultado = new Punto(this.x + a.x, this.y + a.y)
				console.log(new Punto(this.x + a.x, this.y + a.y));
				return resultado
			}
	}