import axios from 'axios';
import { load } from 'cheerio';

// Scraper para Leidsa
const scrapeLeidsa = async () => {
    try {
        const url = 'https://www.leidsa.com/';
        const { data } = await axios.get(url);
        const $ = load(data);

        const resultados = [];
        $('.numerosSorteo div.numero').each((i, elem) => {
            resultados.push($(elem).text().trim());
        });

        return {
            fuente: 'Leidsa',
            fecha: new Date().toLocaleDateString(),
            numeros: resultados
        };
    } catch (error) {
        throw new Error('Error al obtener los datos de Leidsa');
    }
};

// Scraper para Lotería Nacional
const scrapeLoteríaNacional = async () => {
    try {
        const url = 'https://loterialn.gob.do/';
        const { data } = await axios.get(url);
        const $ = load(data);

        const resultados = [];
        $('.resultado-loteria .numero').each((i, elem) => {
            resultados.push($(elem).text().trim());
        });

        return {
            fuente: 'Lotería Nacional',
            fecha: new Date().toLocaleDateString(),
            numeros: resultados
        };
    } catch (error) {
        throw new Error('Error al obtener los datos de Lotería Nacional');
    }
};

// Scraper para Loteka
const scrapeLoteka = async () => {
    try {
        const url = 'https://www.loteka.com/';
        const { data } = await axios.get(url);
        const $ = load(data);

        const resultados = [];
        $('.last-draw .numbers li').each((i, elem) => {
            resultados.push($(elem).text().trim());
        });

        return {
            fuente: 'Loteka',
            fecha: new Date().toLocaleDateString(),
            numeros: resultados
        };
    } catch (error) {
        throw new Error('Error al obtener los datos de Loteka');
    }
};

// 🔹 Scraper para La Suerte Dominicana
const scrapeLaSuerte = async () => {
    try {
        const url = 'https://lasuertedominicana.do';
        const { data } = await axios.get(url);
        const $ = load(data);

        const resultados = [];
        // Selector tentativo - AJUSTAR con el HTML real del sitio
        $('.lottery-results .number').each((i, elem) => {
            resultados.push($(elem).text().trim());
        });

        return {
            fuente: 'La Suerte Dominicana',
            fecha: new Date().toLocaleDateString(),
            numeros: resultados
        };
    } catch (error) {
        throw new Error('Error al obtener los datos de La Suerte Dominicana');
    }
};

// Exportar todas las funciones
export {
    scrapeLeidsa,
    scrapeLoteríaNacional,
    scrapeLoteka,
    scrapeLaSuerte
};

