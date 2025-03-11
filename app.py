import requests
from flask import Flask, request, jsonify
from flask_cors import CORS  # Importar Flask-CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Habilitar CORS para todos los dominios

# URL de tu Google Apps Script desplegado
GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwe5pZENvf_sUmvK-jeuWsLEJK9fHb17vf0jvCp3OY4WnUPQSILNdS0T6fxS13gz8JGuQ/exec"

@app.route('/confirmar_asistencia', methods=['POST'])
def confirmar_asistencia():
    try:
        datos = request.get_json()

        # Validar datos obligatorios
        if not datos or 'nombre' not in datos or 'email' not in datos:
            return jsonify({"error": "Faltan datos obligatorios"}), 400

        # Enviar datos a Google Sheets
        respuesta = requests.post(GOOGLE_SCRIPT_URL, json=datos)

        # Verificar si la solicitud fue exitosa
        respuesta.raise_for_status()  # Lanza un error si el código no es 200

        return jsonify(respuesta.json()), respuesta.status_code

    except requests.exceptions.RequestException as e:
        return jsonify({"error": f"Error de conexión con Google Script: {str(e)}"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
