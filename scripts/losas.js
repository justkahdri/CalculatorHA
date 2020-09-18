var x;
var y;
var h;
var losa = true;
var beta;
var gamma;

var res = document.getElementById('res');
var copiar = document.getElementById('copiar');

function Losa() {

  var prin = document.getElementById('prin');

  console.log('Se inicia la funcion de losas');
  prin.innerHTML = `
    <form>
      <label for='numeracion'>
        <span>Numeraci&oacuten:</span>
        <input type='input' id='numeracion' placeholder='L101' required maxlength="4" pattern='[Ll][0-9]{3}'/>
      <label/><br>
      <label for='x'>
        <span>Ancho de Losa:</span>
        <input type="number" id="x" placeholder='Lx (metros)'/>
      </label><br>
      <label for='y'>
        <span>Largo de Losa:</span>
        <input type="number" id="y" placeholder='Ly (metros)'/>
      </label><br>
      <label for='tipo_losa'>
        <span>Tipo:</span>
        <button class="main-section__button" type="button" id="tipo_losa">Cruzada</button>
      </label>
    </form>
    <div>
      <input class="main-section__button" type='button' id='calcular' value='Calcular' />
    </div>
  `;

  var uni_estilos = document.getElementById('uni_estilos');
  var corte_losa = document.getElementById('corte_losa');
  var tipo_losa = document.getElementById('tipo_losa');
  tipo_losa.addEventListener('click', cambiarTipoLosa);
  var calcular = document.getElementById('calcular');
  calcular.addEventListener('click', LComienzo);
}

function LComienzo() {
  console.log('Comenzo el calculo')
  x = (document.getElementById('x')).value;
  x = parseInt(fullcost(x) * 100);
  y = (document.getElementById('y')).value;
  y = parseInt(fullcost(y) * 100);
  // Recibo los lados y los paso a centimetros

  var mayor;
  var menor;
  if (x <= y) {
    mayor = y;
    menor = x;
  }
  else {
    mayor = x;
    menor = y;
  }

  if (tipo_losa.innerText == 'Unidireccional'){
    console.log('Calculo uni')
    // Deberia de ir el tipo de apoyo y correr el numero que corresponde
    apoyos = parseInt(apoyos.value);
    if (mayor/menor < 2 && apoyos != 10) {
      alert('Error: La losa que ingreso debería ser cruzada');
      return;
    }
    h = menor/apoyos;
  }

  else {
    console.log('Calculo Cruz')
    beta = mayor/menor; //Resuelvo Beta
    if (beta>=2){
      alert('Error: La losa que ingreso debería ser Unidireccional');
      return;
    }
    gamma = beta - 1;
    gamma = 41 + (gamma*8);
    h = (mayor - 12)/gamma;
  }

  if (h < 7) {h = 7;}
  if (h - parseInt(h) > 0.02) {h = Math.ceil(h);}

  if (tipo_losa.innerText == 'Cruzada') {
    res.innerHTML = '&#946 = ' + beta.toFixed(2) + ' <br>';
    res.innerHTML += '&#947 = ' + gamma.toFixed(2) + ' <br>';
    res.innerHTML += 'h = ' + parseInt(h) + 'cm <br>';
  }
  else {res.innerHTML = 'h = ' + parseInt(h) + 'cm <br>';}

  numeracion = document.getElementById('numeracion').value;
  anadirASidebar(numeracion, res);

  copiar.innerHTML = '<button class="main-section__button" onclick=\'copiarAlPortapapeles("res")\'>Copiar Resultados</button>';
//Imprimo los resultados y el boton para copiarlos dentro de los ultimos parrafos en HTML
}

function cambiarTipoLosa() {
  losa ? tipo_losa.innerText = "Cruzada":tipo_losa.innerText = "Unidireccional";
  losa =! losa;

  if (tipo_losa.innerText == 'Unidireccional'){
    uni_estilos.innerHTML = `
      <label for='apoyos'>Seleccione los apoyos correspondientes:</label>
        <select id='apoyos' name='apoyos'>
          <option value='10'>Voladizo</option>
          <option value='20'>Articulado - Articulado</option>
          <option value='24'>Articulado - Empotrado</option>
          <option value='28'>Empotrado - Empotrado</option>
        </select>
    `;

    var apoyos = document.getElementById('apoyos');
    apoyos.addEventListener('change', change_apoyos);
    change_apoyos();
  }
  else {
    uni_estilos.innerHTML = '';
    corte_losa.innerHTML = '';
  }

  advanced_images('Losa', tipo_losa.innerText, x/100, y/100);
}
//Cambio entre Cruzada y Unidireccional dentro del boton de HTML
