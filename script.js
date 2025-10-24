// ==============================
// 🟣 EQUIPO AURORA – SCRIPT BASE
// ==============================

// --- MENÚ MÓVIL (si existe botón .menu-toggle)
const menuBtn = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => nav.classList.toggle('open'));
}

// --- FRASES ALEATORIAS DE INSPIRACIÓN SOSTENIBLE ---
const quotes = [
  '“The greatest threat to our planet is the belief that someone else will save it.” – Robert Swan',
  '“Innovation is seeing change as an opportunity, not a threat.” – Steve Jobs',
  '“Doing more with less is compassionate and enduring.” – Paul Hawken',
  '“Sustainability is about doing more good.” – Jochen Zeitz'
];

// Selecciona el bloque <blockquote id="quote"> y muestra una cita aleatoria
const quoteEl = document.getElementById('quote');
if (quoteEl) {
  quoteEl.textContent = quotes[Math.floor(Math.random() * quotes.length)];
}

// --- AÑO AUTOMÁTICO EN EL FOOTER ---
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ==============================
// 🎵 REPRODUCTOR DE AUDIO "AURORA"
// ==============================

// Referencia al reproductor y al contador
const audio = document.getElementById('audioPlayer');
const playCountEl = document.getElementById('playCount');
const playCountDiv = document.getElementById('playCountDiv');

// Verificamos si existen los elementos (por seguridad)
if (audio && playCountEl && playCountDiv) {

  // Leer el contador almacenado en localStorage (si existe)
  let playCount = parseInt(localStorage.getItem('auroraPlayCount') || '0', 10);

  // Mostrar valor actual al cargar la página
  playCountEl.textContent = playCount;

  // --- Evento: cuando se da "play" al audio ---
  audio.addEventListener('play', () => {

    // 1️⃣ Aumentar contador
    playCount++;

    // 2️⃣ Guardar nuevo valor en localStorage
    localStorage.setItem('auroraPlayCount', playCount);

    // 3️⃣ Actualizar texto visible
    playCountEl.textContent = playCount;

    // 4️⃣ Activar animaciones visuales (efecto “tuanis”)
    //    Clase .playing -> brillo en el reproductor
    //    Clase .updated -> agranda temporalmente el número
    audio.classList.add('playing');
    playCountDiv.classList.add('updated');

    // 5️⃣ Remover las clases luego de un tiempo para que puedan reactivarse
    setTimeout(() => {
      audio.classList.remove('playing');
      playCountDiv.classList.remove('updated');
    }, 700);
  });
}
