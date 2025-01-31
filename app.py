import requests
from flask import Flask, request, jsonify

app = Flask(__name__)

# URL de tu Google Apps Script desplegado
GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/XXXXXXXXXXXXXXXXXXXXXXX/exec"

@app.route('/confirmar_asistencia', methods=['POST'])
def confirmar_asistencia():
    try:
        # Obtener datos del formulario
        nombre = request.form.get('nombre')
        asistencia = request.form.get('asistencia')
        telefono = request.form.get('telefono')
        correo = request.form.get('correo')

        if not nombre or not correo:
            return jsonify({"error": "Faltan datos obligatorios"}), 400

        # Enviar datos al Google Apps Script
        datos = {
            "name": nombre,
            "attendance": asistencia,
            "phone": telefono,
            "email": correo
        }
        
        respuesta = requests.post(GOOGLE_SCRIPT_URL, json=datos, headers={"Content-Type": "application/json"})

        return jsonify(respuesta.json()), respuesta.status_code

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
