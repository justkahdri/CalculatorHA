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
    <p>
      Largo de Losa en X(m):
      <input type="number" id="x" />
      <br>
      Largo de Losa en Y(m):
      <input type="number" id="y" />
      <br>
      <button type="button" id="tipo">Cruzada</button>
    </p>
    <p id='uni_estilos' />
    <p id='graficos'>
    <p>
      <input type='button' id='calcular' value='Calcular' />
    </p>
  `;

  var uni_estilos = document.getElementById('uni_estilos');
  var graficos = document.getElementById('graficos');
  var tipo = document.getElementById('tipo');
  tipo.addEventListener('click', cambiarTipoLosa);
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

  if (tipo.innerText == 'Unidireccional'){
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

  if (tipo.innerText == 'Cruzada') {
    res.innerHTML = '&#946 = ' + beta.toFixed(2) + ' <br>';
    res.innerHTML += '&#947 = ' + gamma.toFixed(2) + ' <br>';
    res.innerHTML += 'h = ' + parseInt(h) + 'cm <br>';
  }
  else {res.innerHTML = 'h = ' + parseInt(h) + 'cm <br>';}


  copiar.innerHTML = '<button onclick=\'copiarAlPortapapeles("res")\'>Copiar Resultados</button>';
//Imprimo los resultados y el boton para copiarlos dentro de los ultimos parrafos en HTML
}

function Graficar(){
  apoyos = document.getElementById('apoyos');
  graficos.innerHTML = `
  <img src="imagenes/${apoyos.value}.png" alt="Grafico de la opcion elegida" style="width:300px;height:200px;">
  `;
}

function cambiarTipoLosa() {
  losa ? tipo.innerText = "Cruzada":tipo.innerText = "Unidireccional";
  losa =! losa;

  if (tipo.innerText == 'Unidireccional'){
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
    Graficar();
    apoyos.addEventListener('change', Graficar);
  }
  else {
    uni_estilos.innerHTML = '';
    graficos.innerHTML = '';
  }
}
//Cambio entre Cruzada y Unidireccional dentro del boton de HTML
