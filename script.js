// ==============================
// 🟣 EQUIPO AURORA – SCRIPT BASE
// ==============================

// --- MENÚ MÓVIL ---
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

const quoteEl = document.getElementById('quote');
if (quoteEl) {
  quoteEl.textContent = quotes[Math.floor(Math.random() * quotes.length)];
}

// --- AÑO AUTOMÁTICO EN EL FOOTER ---
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ==============================
// 🎵 REPRODUCTOR DE AUDIO "AURORA"
// ==============================

// Referencias al reproductor y al contador
const audio = document.getElementById('audioPlayer');
const playCountEl = document.getElementById('playCount');
const playCountDiv = document.getElementById('playCountDiv');
const totalDiv = document.getElementById('totalGlobal');

// --- CONFIGURACIÓN DEL REPO ---
const GITHUB_USERNAME = "koalami";
const GITHUB_REPO = "GB_DEVS";
const GITHUB_BRANCH = "main";

// URL pública del JSON en GitHub Pages
const COUNTER_URL = `https://${GITHUB_USERNAME}.github.io/${GITHUB_REPO}/counter.json`;

// --- Obtener contador global ---
  async function getGlobalCount() {
    try {
      const res = await fetch(`${COUNTER_URL}?t=${Date.now()}`, { cache: "no-store" });
      const data = await res.json();
      if (totalDiv) totalDiv.textContent = `Total global: ${data.count}`;
    } catch (err) {
  console.error("Error al obtener el contador global:", err);
    }
  }

// --- Disparar actualización segura (gatillo) ---
async function triggerSafeUpdate() {
  const username = "koalami";
  const repo = "GB_DEVS";
  const branch = "main";
  const filePath = "update_trigger.json";
  const apiUrl = "https://tusitio.vercel.app/api/updateCounter";

  try {
    // 1️⃣ Obtener el archivo actual (para su SHA)
    const res = await fetch(apiUrl);
    const fileData = await res.json();

    // 2️⃣ Crear nuevo contenido con timestamp
    const newContent = { last_trigger: Date.now() };

   // --- Disparar actualización segura (a través de Vercel) ---
async function triggerSafeUpdate() {
  const apiUrl = "https://gb-devs.vercel.app/api/updateCounter"; // ⚠️ cambia esto si tu dominio Vercel es distinto

  try {
    const response = await fetch(apiUrl, { method: "POST" });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Error al contactar API Vercel:", errorText);
    } else {
      console.log("🔁 Gatillo activado correctamente vía Vercel");
      // Espera unos segundos para que el workflow en GitHub actualice el contador.json
      setTimeout(getGlobalCount, 8000);
    }
  } catch (err) {
    console.error("Error al activar el gatillo en Vercel:", err);
  }
}


// --- Inicialización y lógica de reproducción ---
if (audio && playCountEl && playCountDiv) {
  let playCount = parseInt(localStorage.getItem('auroraPlayCount') || '0', 10);

  // Mostrar valores iniciales
  playCountEl.textContent = playCount;
  getGlobalCount();

  // --- Evento: reproducir audio ---
  audio.addEventListener('play', () => {
    playCount++;
    localStorage.setItem('auroraPlayCount', playCount);
    playCountEl.textContent = playCount;

    // 🔥 Dispara la actualización global segura
   triggerSafeUpdate();
   setTimeout(getGlobalCount, 8000); // 🔁 actualiza el valor global tras 8 s


    // ✨ Animación visual
    audio.classList.add('playing');
    playCountDiv.classList.add('updated');
    setTimeout(() => {
      audio.classList.remove('playing');
      playCountDiv.classList.remove('updated');
    }, 700);
  });
}
