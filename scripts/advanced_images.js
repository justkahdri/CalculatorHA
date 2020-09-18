function advanced_images(figure, type, xmeters, ymeters) {
  var container = document.getElementById('avanzado');

  if (figure == 'Losa') {
    if (type == 'Unidireccional') {
      container.innerHTML = `
        <span class="ny">${ymeters}m</span>
        <span class="nx">${xmeters}m</span>
        <figure class="flecha-y">
          <img src="./imagenes/fy1.svg">
        </figure>
        <figure class="flecha-y2">
          <img src="./imagenes/fy1.svg">
        </figure>
        <figure class="flecha-x">
          <img src="./imagenes/fx1.svg">
        </figure>
        <figure class="flecha-x2">
          <img src="./imagenes/fx1.svg">
        </figure>
        <figure class="figura">
          <img src="./imagenes/unidireccional.svg">
        </figure>
      `;
    }
    else {container.innerHTML = '';}
  }
}

function change_apoyos(){
  console.log('change_apoyos runned');
  apoyos = document.getElementById('apoyos');
  corte_losa.innerHTML = `
  <figure>
    <img src="imagenes/${apoyos.value}.png" class='losas' alt="Grafico de la opcion elegida">
  </figure>
  `;
}
