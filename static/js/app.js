import { database, ref, push } from "./firebase-config.js";

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("confirmationForm").addEventListener("submit", function(e) {
        e.preventDefault(); // Evita que la página se recargue

        let formData = {
            name: document.getElementById("name").value,
            attendance: document.getElementById("attendance").value,
            companions: document.getElementById("companions").value || "0",
            phone: document.getElementById("phone").value || "N/A",
            email: document.getElementById("email").value,
            timestamp: new Date().toISOString()
        };

        console.log("Enviando datos a Firebase:", formData);

        // Guardar en Firebase Realtime Database
        push(ref(database, "confirmaciones"), formData)
            .then(() => {
                alert("Confirmación enviada con éxito 🎉");
                document.getElementById("confirmationForm").reset();
            })
            .catch(error => {
                console.error("Error al guardar:", error);
                alert("Hubo un error al guardar la confirmación.");
            });
    });
});
