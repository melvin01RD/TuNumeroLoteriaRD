import { get } from 'axios';
import { load } from 'cheerio';

// Función para extraer datos de Leidsa
const scrapeLeidsa = async () => {
    try {
        const url = 'https://www.leidsa.com/';
        const { data } = await get(url);
        const $ = load(data);

        const resultados = [];
        $('.clase-de-los-numeros').each((i, elem) => { // Reemplaza con la clase correcta
            resultados.push($(elem).text());
        });

        return resultados;
    } catch (error) {
        throw new Error('Error al obtener los datos de Leidsa');
    }
};

// Función para extraer datos de Lotería Nacional
const scrapeLoteríaNacional = async () => {
    try {
        const url = 'https://loterialn.gob.do/';
        const { data } = await get(url);
        const $ = load(data);

        const resultados = [];
        $('.clase-de-los-numeros').each((i, elem) => { // Reemplaza con la clase correcta
            resultados.push($(elem).text());
        });

        return resultados;
    } catch (error) {
        throw new Error('Error al obtener los datos de Lotería Nacional');
    }
};

// Función para extraer datos de Loteka
const scrapeLoteka = async () => {
    try {
        const url = 'https://www.loteka.com/';
        const { data } = await get(url);
        const $ = load(data);

        const resultados = [];
        $('.clase-de-los-numeros').each((i, elem) => { // Reemplaza con la clase correcta
            resultados.push($(elem).text());
        });

        return resultados;
    } catch (error) {
        throw new Error('Error al obtener los datos de Loteka');
    }
};

// Exportar las funciones
export default {
    scrapeLeidsa,
    scrapeLoteríaNacional,
    scrapeLoteka,
};