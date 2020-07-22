function Clase () {
  var ejercicio = document.getElementById('ejercicio');
  if (ejercicio.value == 'columna') {
    Columna ();
  }
  else if (ejercicio.value == 'viga') {
    Viga ();
  }
  else {
    console.log('fallo la seleccion de clase');
  }
}



var ejercicio;
var inicio = document.getElementById('inicio');
inicio.addEventListener('click', Clase);
