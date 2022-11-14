// Jorge Diest Fábregas (IFCD0210 | UF1846)

// Carga de los packages necesarios
// Servidor
const express = require('express');
// Procesado de DOM
const cheerio = require('cheerio');
// Peticiones XMLHttpRequest
const axios = require('axios');
// Package path nativo de Node
const {join} = require('path');
// Autoreferencias de datos dentro del mismo proyecto
const cors = require('cors');

// Inicialización del servidor mediante express
const app = express();

// Puerto del servidor
const PUERTO = 4000;

// URL del sitio web a examinar
const URL = 'https://webscraper.io/test-sites/e-commerce/allinone/computers';

// Inicialización de CORS (para evitar problemas de autoreferencia al ejecutar nuestro scraper)
app.use(cors());

// Indicación al servidor de express para que use la ruta estática basada en el directorio
// en el que se ejecuta la aplicación mediante la variable __dirname y el nombre del directorio
// en el que se guarda la página web con la que mostraremos el resultado del scrap
// unidos por el método join de path
app.use(express.static(join(__dirname, 'public')));

// Captura del contenido de la web objetivo mediante el scraper
app.get('/scraper', (req,res) =>{
    // Se recogen los datos de la URL mediante las peticiones XMLHttpRequest del package Axios
    axios(URL)
    .then((response) => {
        const html = response.data;
        // console.log('html',html);

        // Se parsea el DOM de los datos recogidos mediante el package axios
        const $ = cheerio.load(html);

        // Array que contendrá los datos que nos interesa recoger de cada producto
        const productos = [];

        // Seleccionando el div que contiene los datos que nos interesan se busca cada uno de ellos identificando las clases de los elementos DOM que los contienen
        $('div.col-sm-4',html).each(
            function(){
                const nombreProducto = $(this).find('div.caption h4 a.title').text();
                const precioProducto = $(this).find('h4.pull-right').text();
                const descProducto = $(this).find('p.description').text();

                // console.log('nombreProducto',nombreProducto);
                // console.log('precioProducto',precioProducto);
                // console.log('descProducto',descProducto);

                // Se añaden dich información al array en forma de objetos
                productos.push(
                    {
                        nombreProducto,
                        precioProducto,
                        descProducto
                    }   
                );
            }
        );
        // console.log(productos);

        // Se devuelve el array en formato json para que pueda ser mostrado mediante app.js
        res.json(productos);
    }).catch((error) => {
        console.log(error);
    });
});

// Activación del servidor
app.listen(PUERTO, () => console.log(`Servidor escuchando en el puerto ${PUERTO}`));