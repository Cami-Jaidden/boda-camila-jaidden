from flask import Flask, render_template, request, redirect
import openpyxl
import os

app = Flask(__name__)

# Ruta para la página principal
@app.route('/')
def index():
    return render_template('index.html')

# Ruta para la página del formulario de confirmación
@app.route('/confirmacion')
def confirmacion():
    return render_template('confirmacion.html')

# Ruta para manejar la confirmación y guardar en Excel
@app.route('/confirmar', methods=['POST'])
def confirmar():
    nombre = request.form['nombre']
    asistencia = request.form['asistencia']
    acompanantes = request.form['acompanantes']

    # Cargar o crear archivo Excel
    file_path = 'data/confirmaciones.xlsx'
    if not os.path.exists(file_path):
        wb = openpyxl.Workbook()
        sheet = wb.active
        sheet.append(["Nombre", "Asistencia", "Acompañantes"])
        wb.save(file_path)

    # Guardar los datos en el archivo Excel
    wb = openpyxl.load_workbook(file_path)
    sheet = wb.active
    sheet.append([nombre, asistencia, acompanantes])
    wb.save(file_path)

    return redirect('/')

if __name__ == '__main__':
    app.run(debug=True)