var l;
var h;
var bw;
var d;
var viga = true;
var prin;
var calcular;

var res = document.getElementById('res');
var copiar = document.getElementById('copiar');
//Disparadores de funciones al final del script

function Viga() {

  var prin = document.getElementById('prin');

  console.log('llego a la viga');
  prin.innerHTML = `
    <form>
      <label for='largo'>
        <span>Largo de Viga(m):</span>
        <input type="number" id="largo" />
      </label><br>
      <label for='tipo'>
        <span>Tipo:</span>
        <button class="main-section__button" type="button" id="tipo">Isostatica</button>
      </label><br>
      <input class="main-section__button" type="button" id="calcular" value="Calcular" />
    </form>
  `;

  var tipo = document.getElementById('tipo');
  tipo.addEventListener('click', cambiarTipoViga);
  var calcular = document.getElementById('calcular');
  calcular.addEventListener('click', VComienzo);

}

function VComienzo() {
  l = document.getElementById('largo');
//Tomo el largo ingresado y lo asigno a la variable "l".
  l = fullcost(l.value);
  l = l * 100;
  l = parseInt(l)
//Paso el largo en metros a centimetros
//Saco los decimales para evitar cualquier incoherencia de la division

  if (l>700) {
    alert('Vigas mayores a 7 metros pueden obstruir las carpinterias!');
  }
//Advertencia

  if (tipo.innerText == 'Isostatica') {h = l/10;}
  else {h = l/12;}
  h = Math.ceil(h);
//Saco los decimales para evitar cualquier incoherencia de la division

  if (h > 20) {
    while (h%5 != 0) { h += 1; }
  }
  else { h = 20; }
//Fuerzo el minimo de 20cm y que el resultado salte de 5 en 5

  bw = h/4;
  if (bw < 12) {bw = 12;}
  else {bw = Math.ceil(bw);}
//Fuerzo el minimo de 12cm y el resultado sin decimales

  d = h - 5;

  res.innerHTML = 'h= ' + h + 'cm <br>';
  res.innerHTML += 'bw= ' + bw + 'cm <br>';
  res.innerHTML += 'd= ' + d + 'cm <br>';
  copiar.innerHTML = '<button class="main-section__button" onclick=\'copiarAlPortapapeles("res")\'>Copiar Resultados</button>';
//Imprimo los resultados y el boton para copiarlos dentro de los ultimos parrafos en HTML

}


function cambiarTipoViga() {
  viga ? tipo.innerText = "Isostatica":tipo.innerText = "Continua";
  viga =! viga
}
//Cambio entre Isostatica y Continua dentro del boton de HTML
