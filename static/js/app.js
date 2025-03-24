import { database, ref, push } from "./firebase-config.js";

// Esperar a que el contenido de la página cargue completamente
document.addEventListener("DOMContentLoaded", function() {
    // Seleccionar el formulario y agregar el evento de envío
    document.getElementById("confirmationForm").addEventListener("submit", function(e) {
        e.preventDefault(); // Evita que la página se recargue al enviar el formulario

        // Capturar los datos del formulario
        let formData = {
            name: document.getElementById("name").value,
            lastname: document.getElementById("lastname").value, // Capturar apellidos
            attendance: document.getElementById("attendance").value,
            phone: document.getElementById("phone").value || "N/A",
            email: document.getElementById("email").value,
            timestamp: new Date().toISOString() // Capturar fecha y hora del envío
        };

        console.log("Enviando datos a Firebase:", formData);

        // Guardar la información en Firebase Realtime Database
        push(ref(database, "confirmaciones"), formData)
            .then(() => {
                alert("Confirmación enviada con éxito 🎉"); // Mensaje de éxito
                document.getElementById("confirmationForm").reset(); // Reiniciar formulario
            })
            .catch(error => {
                console.error("Error al guardar en Firebase:", error);
                alert("Hubo un error al guardar la confirmación. Inténtalo nuevamente.");
            });
    });
});
