// 1. Reproducción de música
const playMusic = () => {
  const audio = new Audio('static/music/musica.mp3');
  audio.play();
};

// 3. Cuenta regresiva
// Verifica si 'eventoFecha' ya está declarada, para evitar la duplicación
if (typeof eventoFecha === 'undefined') {
  const eventoFecha = new Date('2025-10-25T00:00:00').getTime();
}

const countdownElements = {
  dias: document.getElementById('dias'),
  horas: document.getElementById('horas'),
  minutos: document.getElementById('minutos'),
  segundos: document.getElementById('segundos')
};

document.addEventListener("DOMContentLoaded", function() {
  // Reproducir música cuando la página esté cargada
  playMusic();

  if (countdownElements.dias && countdownElements.horas && countdownElements.minutos && countdownElements.segundos) {
      setInterval(() => {
          const ahora = new Date().getTime();
          const diferencia = eventoFecha - ahora;

          // Si la fecha del evento ya pasó, muestra un mensaje
          if (diferencia <= 0) {
              countdownElements.dias.textContent = 0;
              countdownElements.horas.textContent = 0;
              countdownElements.minutos.textContent = 0;
              countdownElements.segundos.textContent = 0;
              alert("¡El evento ha comenzado!");
          } else {
              const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
              const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
              const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
              const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

              countdownElements.dias.textContent = dias;
              countdownElements.horas.textContent = horas;
              countdownElements.minutos.textContent = minutos;
              countdownElements.segundos.textContent = segundos;
          }
      }, 1000);
  } else {
      console.error('Elementos de cuenta regresiva no encontrados en el DOM.');
  }
});
