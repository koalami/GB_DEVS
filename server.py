from flask import Flask, jsonify
import json
from flask_cors import CORS  # permite peticiones desde tu web

app = Flask(__name__)
CORS(app)  # habilita CORS para que GitHub Pages pueda acceder

# Nombre del archivo donde guardamos el contador
COUNT_FILE = "counter.json"

# Función auxiliar: leer el contador actual
def leer_contador():
    try:
        with open(COUNT_FILE, "r") as f:
            data = json.load(f)
            return data.get("reproducciones", 0)
    except FileNotFoundError:
        return 0

# Función auxiliar: guardar el contador actualizado
def guardar_contador(valor):
    with open(COUNT_FILE, "w") as f:
        json.dump({"reproducciones": valor}, f)

@app.route("/get_count", methods=["GET"])
def obtener_contador():
    count = leer_contador()
    return jsonify({"reproducciones": count})

@app.route("/update_count", methods=["POST"])
def actualizar_contador():
    count = leer_contador() + 1
    guardar_contador(count)
    return jsonify({"reproducciones": count})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
