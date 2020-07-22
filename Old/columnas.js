var carga;
var w;
var ag;
var cx;
var cy;
var h = 25;
var pisos = 1;
//Disparadores de funciones al final del script

function Comienzo() {
  carga = document.getElementById('carga');
  carga = parseFloat(carga.value);
  h = document.getElementById('H');
  h = parseInt(h.value);
  pisos = document.getElementById('pisos');
  pisos = parseInt(1 + parseInt(pisos.value));

  w = carga * 9 * pisos;
  ag = (2.15 * w) / (0.85 * h/10);
//Saco los decimales para evitar cualquier incoherencia de la division

  cx = (Math.sqrt(ag));
  if (cx > 20) {
    cx = Math.ceil(cx);
    while (cx%5 != 0) { cx += 1; }
    cy = 20;
    while (((cx * cy) < ag) && (cy%5 != 0)) { cy += 1; }
  }

  else {
    cx = 20;
    cy = cx;
  }
//Fuerzo el minimo de 20cm y que el resultado salte de 5 en 5

  res.innerHTML = 'W= ' + w.toFixed(2) + 'KN <br />';
  res.innerHTML += 'Ag= ' + ag.toFixed(2) + 'cm<sup>2</sup> <br />';
  if (cx == cy) { res.innerHTML += 'C<sub>x</sub>= C<sub>y</sub>= ' + cx + 'cm <br />'; }
  else {
    res.innerHTML += 'C<sub>x</sub>= ' + cx + 'cm <br />';
    res.innerHTML += 'C<sub>y</sub>= ' + cy + 'cm <br />';
  }

  copiar.innerHTML = '<button onclick=\'copiarAlPortapapeles("res")\'>Copiar Resultados</button>';
//Imprimo los resultados y el boton para copiarlos dentro de los ultimos parrafos en HTML

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

var res = document.getElementById('res');
var copiar = document.getElementById('copiar');
var calcular = document.getElementById('calcular');
calcular.addEventListener('click', Comienzo);
