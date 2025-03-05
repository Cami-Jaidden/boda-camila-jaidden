// Reproducción de música
const playMusic = () => {
  const audio = new Audio('static/music/musica.mp3');
  audio.play();
};

// Cuenta regresiva
const eventoFecha = new Date('2025-10-25T00:00:00').getTime();
setInterval(() => {
  const ahora = new Date().getTime();
  const diferencia = eventoFecha - ahora;

  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

  document.getElementById('dias').textContent = dias;
  document.getElementById('horas').textContent = horas;
  document.getElementById('minutos').textContent = minutos;
  document.getElementById('segundos').textContent = segundos;
}, 1000);
