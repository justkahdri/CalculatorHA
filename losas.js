var x;
var y;
var h;
var losa = true;
var beta;
var alfa;

function Losa() {

  var prin = document.getElementById('prin');

  console.log('Se inicia la funcion de losas');
  prin.innerHTML = `
    <p>
      Largo de Losa en X(m):
      <input type="number" id="x" />
      <br />
      Largo de Losa en Y(m):
      <input type="number" id="y" />
      <br />
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
  tipo.addEventListener('click', CambiarTipo);
  var calcular = document.getElementById('calcular');
  calcular.addEventListener('click', LComienzo);
}

function LComienzo() {
  console.log('Comenzo el calculo')
  x = (document.getElementById('x')).value;
  x = parseInt(parseFloat(x) * 100);
  y = (document.getElementById('y')).value;
  y = parseInt(parseFloat(y) * 100);
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
    //var apoyos = document.getElementById('apoyos');
    // Deberia de ir el tipo de apoyo y correr el numero que corresponde
    apoyos = parseInt(apoyos.value);
    h = menor/apoyos;
  }

  else {
    console.log('Calculo Cruz')
    beta = mayor/menor; //Resuelvo Beta
    beta -= 1;
    alfa = 41 + (beta*8);
    h = (mayor - 12)/alfa;
  }

  h = Math.ceil(h);
  if (h < 8) {h = 8;}
}

function Graficar(){
  graficos.innerHTML = `
  <img src="imagenes/${apoyos.value}.png" alt="Grafico de la opcion elegida" style="width:300px;height:200px;">
  `;
}

function CambiarTipo() {
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
