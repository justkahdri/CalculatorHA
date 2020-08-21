var carga;
var w;
var ag;
var cx;
var cy;
var h = 25;
var pisos = 1;

var res = document.getElementById('res');
var copiar = document.getElementById('copiar');

function Columna() {

  var prin = document.getElementById('prin');

  console.log('llego a la columna');
  prin.innerHTML = `
    <p>
      &Aacuterea de Influencia / Carga (m&sup2):
      <input type='number' id='carga' />
      <br>Cantidad de Pisos:
      <input type='number' id='pisos' />
      <br>
      <label for='H'>Seleccione el tipo de Hormigón:</label>
      <select id='H' name='H'>
        <option value='35'>H35</option>
        <option value='30'>H30</option>
        <option value='25'>H25</option>
        <option value='20'>H20</option>
      </select>
      <br>
      <input type='button' id='calcular' value='Calcular' />
    </p>
  `;

  var calcular = document.getElementById('calcular');
  calcular.addEventListener('click', CComienzo);

}


function CComienzo() {
  carga = document.getElementById('carga');
  carga = fullcost(carga.value);
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

  res.innerHTML = 'W= ' + w.toFixed(2) + 'KN <br>';
  res.innerHTML += 'Ag= ' + ag.toFixed(2) + 'cm&sup2 <br>';
  if (cx == cy) { res.innerHTML += 'C<sub>x</sub>= C<sub>y</sub>= ' + cx + 'cm <br>'; }
  else {
    res.innerHTML += 'C<sub>x</sub>= ' + cx + 'cm <br>';
    res.innerHTML += 'C<sub>y</sub>= ' + cy + 'cm <br>';
  }

  copiar.innerHTML = '<button onclick=\'Bases(w)\'>Calcular Bases</button> <br>'; //Inicia la funcion de bases
  copiar.innerHTML += '<button onclick=\'copiarAlPortapapeles("res")\'>Copiar Resultados</button>';
//Imprimo los resultados y el boton para copiarlos dentro de los ultimos parrafos en HTML
}

function Bases(w_columna) {
  var w_base = w_columna * 1.1
  var t_adm = 2
  var ab = (w_base*100) / t_adm
  var ax = Math.sqrt(ab)
  if (ax > 100) {
    ax = Math.ceil(ax);
    while (ax%5 != 0) { ax += 1; }
  }
  else {ax = 100}

//  var ay = ax

  res_bases = '<br>Wb= ' + w_base.toFixed(2) + 'KN <br>';
  res_bases += 'Tadm= ' + t_adm + ' kg/cm&sup2 <br>';
  res_bases += 'a<sub>x</sub>= a<sub>y</sub>= ' + ax + 'cm <br>';

  res.innerHTML += res_bases;
//  if (cx == cy) { res_bases.innerHTML += 'C<sub>x</sub>= C<sub>y</sub>= ' + cx + 'cm <br>'; }
//  else {
//    res_bases.innerHTML += 'C<sub>x</sub>= ' + cx + 'cm <br>';
//    res_bases.innerHTML += 'C<sub>y</sub>= ' + cy + 'cm <br>';
//  }

  copiar.innerHTML = '<button onclick=\'copiarAlPortapapeles("res")\'>Copiar Resultados</button>';
}
