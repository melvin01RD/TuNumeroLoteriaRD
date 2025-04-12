import datetime
from flask import Flask, jsonify, Response, request
from flask_cors import CORS, cross_origin  # type: ignore
import re
import urllib.request
from bs4 import BeautifulSoup  # type: ignore
import os
import json

# Obtén la ruta absoluta al archivo JSON
json_file_path = "C:\\Users\\Dell\\OneDrive - Pontificia Universidad Católica Madre y Maestra\\Escritorio\\TuNumeroLoteriaRD-main\\backend\\src\\lottery.json"

# json_file_path = os.path.abspath("lottery.json")  

def load_html(search_date=None):
    url1 = "https://loteriasdominicanas.com/"
    # Esta segunda URL es porque en la página principal no aparecen las Loterías Anguila
    url2 = "https://loteriasdominicanas.com/anguila" 

    # Agregar el parámetro date a la URL si existe
    if search_date:
        url1 += f"?date={search_date}"
        url2 += f"?date={search_date}"
        
    # Crea una lista para almacenar los elementos de ambos soups
    games_blocks = []

    try:
        html1 = urllib.request.urlopen(url1).read()
        html2 = urllib.request.urlopen(url2).read()
                
        soup1 = BeautifulSoup(html1, "html.parser")
        soup2 = BeautifulSoup(html2, "html.parser")
                
        # Encuentra los elementos deseados del soup y agrégales a la lista
        blocks1 = soup1.find_all("div", class_="game-block")
        games_blocks.extend(blocks1)

        # Encuentra los elementos del soup y agrégales a la lista
        blocks2 = soup2.find_all("div", class_="game-block")
        games_blocks.extend(blocks2)
    except:
        return []

    return games_blocks

def load_html_name(search_name, search_date=None):
    url1 = f"https://loteriasdominicanas.com/{search_name}"

    # Agregar el parámetro date a la URL si existe
    if search_date:
        url1 += f"?date={search_date}"

    # Crea una lista para almacenar los elementos de ambos soups
    games_blocks = []

    try:
        html1 = urllib.request.urlopen(url1).read()      
        soup1 = BeautifulSoup(html1, "html.parser")
                
        # Encuentra los elementos deseados del soup y agrégales a la lista
        blocks1 = soup1.find_all("div", class_="game-block")
        games_blocks.extend(blocks1)
    except:
        return []

    return games_blocks

def scraping(search_date=None, search_lotery=None):
    data = []
    loteries_parser = []
    
    # Cargar JSON desde la ruta absoluta
    try:
        with open(json_file_path, 'r', encoding='utf-8') as file:
            json_data = file.read()
            data = json.loads(json_data)
    except FileNotFoundError:
        return {"error": "lottery.json file not found"}

    if search_lotery:
        data = [item for item in data if search_lotery.lower() in item["name"].lower()]
    
    if len(data) == 0:
        return data

    # Load HTML 
    games_blocks = load_html(search_date)

    for game_block in games_blocks:
        block = {}
        title = game_block.find("a", "game-title").getText().strip().lower()
        
        filtered_data = [item for item in data if item["name"].lower() == title]
        if len(filtered_data) == 0:
            continue  

        pather_score = game_block.find_all("span", "score")
        pather_date = game_block.find("div", "session-date").getText().strip()
        score = "-".join(span.text.strip() for span in pather_score)

        block['id'] = filtered_data[0]["id"]
        block['name'] = filtered_data[0]["name"]
        block['date'] = pather_date
        block['number'] = score
        loteries_parser.append(block)
    
    return sorted(loteries_parser, key=lambda k:k["id"])

def scrapingByName(search_name, search_date=None, search_lotery=None):
    data = []
    loteries_parser = []
    
    # Cargar JSON desde la ruta absoluta
    try:
        with open(json_file_path, 'r', encoding='utf-8') as file:
            json_data = file.read()
            data = json.loads(json_data)
    except FileNotFoundError:
        return {"error": "lottery.json file not found"}

    if search_lotery:
        data = [item for item in data if search_lotery.lower() in item["name"].lower()]
    
    if len(data) == 0:
        return data

    # Load HTML 
    games_blocks = load_html_name(search_name, search_date)

    for game_block in games_blocks:
        block = {}
        title = game_block.find("a", "game-title").getText().strip().lower()

        filtered_data = [item for item in data if item["name"].lower() == title]
        if len(filtered_data) == 0:
            continue  

        pather_score = game_block.find_all("span", "score")
        pather_date = game_block.find("div", "session-date").getText().strip()
        score = "-".join(span.text.strip() for span in pather_score)

        block['id'] = filtered_data[0]["id"]
        block['name'] = filtered_data[0]["name"]
        block['date'] = pather_date
        block['number'] = score
        loteries_parser.append(block)

    return sorted(loteries_parser, key=lambda k:k["id"])

def JsonUFT8(data=None):
    json_string = json.dumps(data, ensure_ascii=False)
    return Response(json_string, content_type='application/json; charset=utf-8')

app = Flask(__name__)
CORS(app)
port = int(os.environ.get("PORT", 5000))

@app.route("/", methods=['GET'])
def search_lotery():
    search_date = request.args.get('date', datetime.datetime.now().strftime("%d-%m-%Y"))
    data = scraping(search_date)
    return JsonUFT8(data)

@app.route("/search", methods=['GET'])
def search_lotery_by_name():
    search_query = request.args.get('name', None)
    search_date = request.args.get('date', datetime.datetime.now().strftime("%d-%m-%Y"))

    if not search_query:
        return jsonify({"error": "Missing 'name' parameter"}), 400
    
    data = scraping(search_date, search_query) 
    return JsonUFT8(data)

@app.route("/loteria-gana-mas", methods=['GET'])
def search_lotery1():
    search_date = request.args.get('date', datetime.datetime.now().strftime("%d-%m-%Y"))
    data = scrapingByName("loteria-nacional/gana-mas", search_date, "Gana Más")
    return JsonUFT8(data)

@app.route("/loteria-primera", methods=['GET'])
def search_lotery2():
    search_query = request.args.get('name', "primera")
    search_date = request.args.get('date', datetime.datetime.now().strftime("%d-%m-%Y"))
    data = scrapingByName("la-primera", search_date, search_query) 
    return JsonUFT8(data)

@app.route("/loteria-primera-12am", methods=['GET'])
def search_lotery3():
    search_date = request.args.get('date', datetime.datetime.now().strftime("%d-%m-%Y"))
    data = scrapingByName("la-primera/quiniela-medio-dia", search_date, "la primera Día")
    return JsonUFT8(data)

@app.route("/loteria-primera-noche", methods=['GET'])
def search_lotery4():
    search_date = request.args.get('date', datetime.datetime.now().strftime("%d-%m-%Y"))
    data = scrapingByName("la-primera/quiniela-noche", search_date, "Primera Noche")
    return JsonUFT8(data)

@app.route("/loteria-loteka", methods=['GET'])
def search_lotery7():
    search_query = request.args.get('name', "Lotería Loteka")
    search_date = request.args.get('date', datetime.datetime.now().strftime("%d-%m-%Y"))
    data = scrapingByName("loteka", search_date, search_query) 
    return JsonUFT8(data)

@app.route('/loteria-la-suerte', methods=['GET'])
def search_lotery8():
    search_query = request.args.get('name', "Lotería La Suerte")
    search_date = request.args.get('date', datetime.datetime.now().strftime("%d-%m-%Y"))
    data = scrapingByName("la-suerte", search_date, search_query) 
    return JsonUFT8(data)

# Resto de rutas aquí (de manera similar a las anteriores)

app.run(port=port)
