var remplazos = ['<sub>', '</sub>', '</sup>', '<sup>', '<br>'];

function Clase () {
  var clear = [res, copiar, uni_estilos, corte_losa];
  for (i in clear) {
    clear[i].innerHTML = '';
  }
  var ejercicio = document.getElementById('ejercicio');
  if (ejercicio.value == 'columna') {
    Columna ();
  }
  else if (ejercicio.value == 'viga') {
    Viga ();
  }
  else if (ejercicio.value == 'losa') {
    Losa ();
  }
  else {
    console.log('fallo la seleccion de clase');
    alert('Ocurrio un error al iniciar el ejercicio');
  }
}

 function anadirASidebar(identficador, resultado, bases=false) {
   var historial = document.getElementById('historial');
   var ultimoEjercicio = document.createElement('details');

   if (bases) {
     historial.parentNode.removeChild(historial.parentNode.childNodes[2]);
   }

   ultimoEjercicio.innerHTML = `
    <summary>${identficador}</summary>
    ${resultado.innerHTML}
    <span class='erase'>Eliminar del historial</span>
   `;

   historial.parentNode.insertBefore(ultimoEjercicio, historial.nextSibling);
}

function copiarAlPortapapeles(id_elemento) {

  var aux = document.createElement("input");
  // Crea un campo de texto "oculto"

  aux.setAttribute("value", document.getElementById(id_elemento).innerHTML);
  // Asigna el contenido del elemento especificado al valor del campo

  //var str = aux.value;

  for (i in remplazos) {
    aux.value = aux.value.split(remplazos[i]).join('');
  }
  //Borra las etiquetas de HTML

  document.body.appendChild(aux);
  // Añade el campo a la página

  aux.select();
  // Selecciona el contenido del campo


  document.execCommand("copy");
  // Copia el texto seleccionado


  document.body.removeChild(aux);
  // Elimina el campo de la página

}

function fullcost(string) {
  var full = parseFloat((string).replace(',', '.'));
  return full;
}



var ejercicio;
var inicio = document.getElementById('inicio');
inicio.addEventListener('click', Clase);
