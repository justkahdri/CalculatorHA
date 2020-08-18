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



var ejercicio;
var inicio = document.getElementById('inicio');
inicio.addEventListener('click', Clase);
