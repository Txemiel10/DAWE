function inicializarGestores()
{
	var imagen = document.getElementById("imagen");
	var imagenes=new Array(
	'url(images/limon.jpg)',
	'url(images/fresas.jpg)',
	'url(images/mandarinas.jpg)',
	'url(images/manzanas.jpg)',
	'url(images/melon.jpg)',
	'url(images/heade_ft.jpg)')
    let indice = 0
	 
	function cambioImagen()
    {
		imagen.style.backgroundImage = imagenes[indice]
        if (indice == 6){indice = 0}else{indice = indice+1}
    }
	var reloj = setInterval(cambioImagen,4900);
	
	imagen.onclick = function()
	{
		alert("Has pulsado la imagen");
		clearInterval(reloj)
	}
	
	var usuario = document.getElementById("usuario");
	usuario.value = 'tu@email';

	usuario.onblur = function(){
		if (usuario.value == ''){
			usuario.value = "tu@email";
		}
	}

	usuario.onfocus = function(){
		if (usuario.value == 'tu@email'){
			usuario.value = '';
		}
	}

	var item = document.getElementById("combobox");
	item.addEventListener("change",gestorCombo);

	function gestorCombo(){
		console.log(item.value);
		console.log(item.options[item.selectedIndex].text);
		console.log(item.selectedIndex);
	} 

	var formulario = document.getElementById('formulario');
	formulario.onsubmit = function(){
		console.log("click en submit");
		return false;
	}

}

window.onload = inicializarGestores;
