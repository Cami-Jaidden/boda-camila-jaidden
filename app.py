from flask import Flask, request, render_template, jsonify
import smtplib
from email.mime.text import MIMEText
import sqlite3  # Puedes cambiarlo por MySQL si quieres

app = Flask(__name__)

# Ruta del formulario
@app.route('/')
def index():
    return render_template('index.html')

# Ruta para recibir confirmaciones de asistencia
@app.route('/confirmar', methods=['POST'])
def confirmar():
    nombre = request.form['nombre']
    correo = request.form['correo']
    mensaje = f"Hola {nombre}, gracias por confirmar tu asistencia a nuestra boda."

    # Guardar en la base de datos
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    cursor.execute("INSERT INTO confirmaciones (nombre, correo) VALUES (?, ?)", (nombre, correo))
    conn.commit()
    conn.close()

    # Enviar correo de confirmación
    enviar_correo(correo, mensaje)

    return jsonify({'mensaje': 'Confirmación recibida y correo enviado'})

# Función para enviar correos
def enviar_correo(destinatario, mensaje):
    remitente = "tu.correo@gmail.com"
    contraseña = "tu-contraseña"
    msg = MIMEText(mensaje)
    msg['Subject'] = "Confirmación de Asistencia"
    msg['From'] = remitente
    msg['To'] = destinatario

    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
        server.login(remitente, contraseña)
        server.sendmail(remitente, destinatario, msg.as_string())

if __name__ == '__main__':
    app.run(debug=True)
