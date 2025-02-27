import { Router } from 'express';
import { scrapeLeidsa, scrapeLoteríaNacional, scrapeLoteka } from '../scrapers/scraper';

const router = Router();

// Ruta para obtener los resultados de Leidsa
router.get('/leidsa', async (req, res) => {
    try {
        const resultados = await scrapeLeidsa();
        res.json({ resultados });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ruta para obtener los resultados de Lotería Nacional
router.get('/loterianacional', async (req, res) => {
    try {
        const resultados = await scrapeLoteríaNacional();
        res.json({ resultados });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ruta para obtener los resultados de Loteka
router.get('/loteka', async (req, res) => {
    try {
        const resultados = await scrapeLoteka();
        res.json({ resultados });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;