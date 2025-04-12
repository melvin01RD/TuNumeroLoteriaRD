import { Router } from 'express';
import axios from 'axios';

const router = Router();
const FLASK_URL = 'http://localhost:5000';

// Leidsa
router.get('/leidsa', async (req, res) => {
    try {
        const response = await axios.get(`${FLASK_URL}/search?name=leidsa`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener datos de Leidsa' });
    }
});

// Lotería Nacional
router.get('/loterianacional', async (req, res) => {
    try {
        const response = await axios.get(`${FLASK_URL}/search?name=nacional`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener datos de Lotería Nacional' });
    }
});

// Loteka
router.get('/loteka', async (req, res) => {
    try {
        const response = await axios.get(`${FLASK_URL}/loteria-loteka`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener datos de Loteka' });
    }
});

// Lotería Real
router.get('/real', async (req, res) => {
    try {
        const response = await axios.get(`${FLASK_URL}/search?name=real`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener datos de Lotería Real' });
    }
});
// Lotería Suerte
router.get('/suerte', async (req, res) => {
    try {
        const response = await axios.get(`${FLASK_URL}/loteria-suerte`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener datos de Lotería Suerte' });
    }
});
// Lotería Primera
router.get('/primera', async (req, res) => {
    try {
        const response = await axios.get(`${FLASK_URL}/loteria-primera`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener datos de Lotería Primera' });
    }
});
// Lotería Primera 12am
router.get('/primera-12am', async (req, res) => {
    try {
        const response = await axios.get(`${FLASK_URL}/loteria-primera-12am`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener datos de Lotería Primera 12am' });
    }
});
// Lotería Primera Noche
router.get('/primera-noche', async (req, res) => {
    try {
        const response = await axios.get(`${FLASK_URL}/loteria-primera-noche`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener datos de Lotería Primera Noche' });
    }
});
// Lotería Real
router.get('/real', async (req, res) => {
    try {
        const response = await axios.get(`${FLASK_URL}/search?name=real`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener datos de Lotería Real' });
    }
});
// Lotería Gana Más
router.get('/gana-mas', async (req, res) => {
    try {
        const response = await axios.get(`${FLASK_URL}/loteria-gana-mas`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener datos de Lotería Gana Más' });
    }
});
// Lotería La Suerte Dominicana
router.get('/la-suerte', async (req, res) => {
    try {
        const response = await axios.get(`${FLASK_URL}/loteria-la-suerte`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener datos de Lotería La Suerte Dominicana' });
    }
});
export default router;