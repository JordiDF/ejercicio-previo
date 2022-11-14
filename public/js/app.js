// Jorge Diest Fábregas (IFCD0210 | UF1846)

// Captura del div donde se guardará el resultado del scraping
const divDestino = document.getElementById('productos');

// URL de nuestro scraper
const URL = 'http://localhost:4000/scraper'

// Se recoge la información que nos devuelve el scraper
fetch(URL)
    .then(response => {
        return response.json();
    })
    // Se procesan los datos recibidos
    .then(data => {
        data.forEach(producto => {
            // console.log(producto.nombreProducto);
            // console.log(producto.precioProducto);
            // console.log(producto.descProducto);

            // Variable que recogerá los datos de cada producto (html con clases css)
            let datosproducto = '';
            datosproducto += `<h2>${producto.nombreProducto}</h2>`;
            datosproducto += `<p class="precio">${producto.precioProducto}</p>`;
            datosproducto += `<p class="desc">${producto.descProducto}</p>`;

            // Inserción de los datos dentro del div designado para contenerlos
            divDestino.insertAdjacentHTML('beforeend', datosproducto);
        });
    })
    .catch((error) => {
        console.log(error);
    })