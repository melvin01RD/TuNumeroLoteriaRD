import express from 'express';
import { get } from 'axios';
import { load } from 'cheerio';

const app = express();
const PORT = 3000;

// Ruta para obtener los resultados de la lotería
app.get('/api/loteria', async (req, res) => {
    try {
        const url = 'https://www.leidsa.com/'; // URL de la lotería
        const { data } = await get(url); // Obtener el HTML de la página
        const $ = load(data); // Cargar el HTML en Cheerio

        // Extraer los datos (ajusta según la estructura del sitio)
        const resultados = [];
        $('.clase-de-los-numeros').each((i, elem) => { // Reemplaza con la clase correcta
            resultados.push($(elem).text());
        });

        // Enviar los datos como respuesta
        res.json({ resultados });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los datos' });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});