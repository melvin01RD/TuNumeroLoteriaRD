import express from 'express';
import axios from 'axios';
import * as cheerio from 'cheerio';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());

// Ruta raíz para comprobar que Express está corriendo
app.get('/', (req, res) => {
    res.send('API de loterías corriendo correctamente 🚀');
});

// Ruta antigua para Leidsa (scraping manual)
app.get('/api/loteria', async (req, res) => {
    try {
        const url = 'https://www.leidsa.com/';
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const resultados = [];
        $('.clase-de-los-numeros').each((i, elem) => {
            resultados.push($(elem).text());
        });

        res.json({ resultados });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los datos' });
    }
});

// RUTAS CONECTADAS AL BACKEND FLASK (localhost:5000)

// Nacional
app.get('/nacional', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:5000/search?name=nacional');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los datos de Nacional' });
    }
});

// Leidsa
app.get('/leidsa', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:5000/search?name=leidsa');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los datos de Leidsa' });
    }
});

// Lotería Real
app.get('/real', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:5000/search?name=real');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los datos de Real' });
    }
});

// Lotería Primera
app.get('/primera', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:5000/search?name=primera');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los datos de La Primera' });
    }
});

// La Primera 12am
app.get('/primera-12am', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:5000/search?name=primera-12am');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los datos de La Primera 12am' });
    }
});

// La Primera Noche
app.get('/primera-noche', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:5000/search?name=primera-noche');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los datos de La Primera Noche' });
    }
});

// Gana Más
app.get('/gana-mas', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:5000/search?name=gana-mas');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los datos de Gana Más' });
    }
});

// La Suerte Dominicana
app.get('/loteria-la-suerte', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:5000/search?name=la-suerte');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los datos de La Suerte' });
    }
});
// Lotería Loteka
app.get('/loteria-loteka', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:5000/search?name=loteka');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los datos de Loteka' });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});