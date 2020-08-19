function Clase () {
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

function copiarAlPortapapeles(id_elemento) {

  var aux = document.createElement("input");
  // Crea un campo de texto "oculto"

  aux.setAttribute("value", document.getElementById(id_elemento).innerHTML);
  // Asigna el contenido del elemento especificado al valor del campo

  var str = aux.value;
  str = str.replace(/<br\s*[\/]?>/gi, "\n");
  aux.value = str.replace(/<sub\s*[\/]?>/gi, "\n");
  //Borra los saltos de linea de HTML

  document.body.appendChild(aux);
  // Añade el campo a la página

  aux.select();
  // Selecciona el contenido del campo


  document.execCommand("copy");
  // Copia el texto seleccionado


  document.body.removeChild(aux);
  // Elimina el campo de la página

}


var ejercicio;
var inicio = document.getElementById('inicio');
inicio.addEventListener('click', Clase);
