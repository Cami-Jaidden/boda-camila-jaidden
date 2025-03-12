document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("confirmationForm").addEventListener("submit", function(e) {
      e.preventDefault(); // Evita recargar la página

      // Capturar datos del formulario
      let formData = {
          name: document.getElementById("name").value,
          attendance: document.getElementById("attendance").value,
          companions: document.getElementById("companions").value,
          phone: document.getElementById("phone").value,
          email: document.getElementById("email").value,
          timestamp: new Date().toISOString()
      };

      console.log("Enviando datos a Firebase:", formData);

      // Guardar en Realtime Database
      push(ref(database, "confirmaciones"), formData)
          .then(() => {
              alert("Confirmación enviada con éxito 🎉");
              document.getElementById("confirmationForm").reset(); // Limpiar formulario
          })
          .catch(error => {
              console.error("Error al guardar:", error);
              alert("Hubo un error al guardar la confirmación.");
          });
  });
});
