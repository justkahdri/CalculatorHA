var carga;
var w;
var ag;
var cx;
var cy;
var h = 25;
var pisos = 1;

var res = document.getElementById('res');
var copiar = document.getElementById('copiar');

function Tabique() {

  var prin = document.getElementById('prin');

  console.log('llego a la columna');
  prin.innerHTML = `
    <form>
      <label for='numeracion'>
        <span>Numeraci&oacuten:</span>
        <input type='input' id='numeracion' placeholder='T101' required maxlength="4" pattern='[Tt][0-9]{3}'/>
      </label>
      <br>
      <label for='carga'>
        <span>&Aacuterea de Influencia:</span>
        <input type='number' id='carga' placeholder='Carga (m&sup2)' required min='0'/>
      </label>
      <br>
      <label for='perimetro'>
        <span>Per&iacutemetro:</span>
        <input type='number' id='perimetro' placeholder='Per&iacutemetro (m)' required min='0'/>
      </label>
      <br>
      <label for='pisos'>
        <span>Cantidad de Pisos:</span>
        <input type='number' id='pisos' placeholder='Nro. de pisos' required min='0'/>
      </label>
      <br>
      <label for='H'>
        <span>Seleccione el tipo de Hormigón:</span>
        <select id='H' name='H'>
          <option value='35'>H35</option>
          <option value='30'>H30</option>
          <option value='25'>H25</option>
          <option value='20'>H20</option>
        </select>
      </label>
      <br>
      <input class="main-section__button" type='button' id='calcular_t' value='Calcular' />
    </form>
  `;

  var calcular_t = document.getElementById('calcular_t');
  calcular_t.addEventListener('click', TComienzo);

}


function TComienzo() {
  carga = document.getElementById('carga');
  carga = fullcost(carga.value);
  h = document.getElementById('H');
  h = parseInt(h.value);
  p = document.getElementById('perimetro');
  p = fullcost(p.value);
  pisos = document.getElementById('pisos');
  pisos = parseInt(1 + parseInt(pisos.value));

  w = carga * 9 * pisos;
  ag = (2.15 * w) / (0.85 * h/10);
//Saco los decimales para evitar cualquier incoherencia de la division

  e = ag/(p*100);
  if (e > 12) { e = Math.ceil(e); }

  else { e = 12;}
//Fuerzo el minimo de 12cm y que el resultado salte de 1 en 1

  res.innerHTML = 'W= ' + w.toFixed(2) + 'KN <br>';
  res.innerHTML += 'Ag= ' + ag.toFixed(2) + 'cm&sup2 <br>';
  res.innerHTML += 'e= ' + e + 'cm <br>';

  numeracion = document.getElementById('numeracion').value;
  anadirASidebar(numeracion, res);

  copiar.innerHTML = '<button class="main-section__button" onclick=\'bases_tabiques(w, p)\'>Calcular Bases</button> <br>'; //Inicia la funcion de bases
  copiar.innerHTML += '<button class="main-section__button" onclick=\'copiarAlPortapapeles("res")\'>Copiar Resultados</button>';
//Imprimo los resultados y el boton para copiarlos dentro de los ultimos parrafos en HTML
}

function bases_tabiques(w_tabique, perimetro) {
  var w_base = w_tabique * 1.1
  var t_adm = 2
  var ab = (w_base*100) / t_adm
  var ap = perimetro + 88;
  if (Math.sqrt(ab) > (ap+100)/2) { ap = Math.sqrt(ab); }
  if (ap > 100) {
    ap = Math.ceil(ap);
    while (ap%5 != 0) { ap += 1; }
  }
  else {ap = 100}


  res_bases = '<br>Wb= ' + w_base.toFixed(2) + 'KN <br>';
  res_bases += 'Tadm= ' + t_adm + ' kg/cm&sup2 <br>';
  res_bases += 'a<sub>p</sub>= ' + ap + 'cm <br>';
  res_bases += 'a<sub>esp</sub>= 100cm<br>';

  res.innerHTML += res_bases;

  numeracion = document.getElementById('numeracion').value;
  anadirASidebar(numeracion + ' (con Bases)', res, bases=true);

  copiar.innerHTML = '<button class="main-section__button" onclick=\'copiarAlPortapapeles("res")\'>Copiar Resultados</button>';
}
