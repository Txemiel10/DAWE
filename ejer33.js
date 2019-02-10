function Punto(x, y)
	{ 
				this.x = x;
				this.y = y;

			this.suma = function(a)
			{
				console.log(new Punto(this.x + a.x, this.y + a.y));

			}
	}