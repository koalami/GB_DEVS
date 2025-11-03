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

// --- CONFIGURACIÓN DEL REPO PARA GITHUB ACTIONS ---
const GITHUB_USERNAME = "koalami";
const GITHUB_REPO = "GB_DEVS";
const GITHUB_BRANCH = "main";

// URL pública del JSON (servido por GitHub Pages)
const COUNTER_URL = `https://${GITHUB_USERNAME}.github.io/${GITHUB_REPO}/counter.json`;

// Función para obtener el valor actual del contador global
async function getGlobalCount() {
  try {
    const res = await fetch(COUNTER_URL);
    const data = await res.json();
    if (totalDiv) totalDiv.textContent = `Total global: ${data.count}`;
  } catch (err) {
    console.error("Error al obtener el contador global:", err);
  }
}

async function triggerSafeUpdate() {
  const username = "koalami";
  const repo = "GB_DEVS";
  const branch = "main";

  const filePath = "update_trigger.json";
  const apiUrl = `https://api.github.com/repos/${username}/${repo}/contents/${filePath}`;

  try {
    // 1️⃣ Obtiene el archivo actual (para saber el SHA)
    const res = await fetch(apiUrl);
    const fileData = await res.json();

    // 2️⃣ Genera un valor aleatorio para cambiar el archivo
    const newContent = {
      last_trigger: Date.now()
    };

    // 3️⃣ Actualiza el archivo con una nueva marca de tiempo
    await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Accept": "application/vnd.github+json",
        "Authorization": `Bearer TU_TOKEN_SOLO_EN_ACCIONES`, // o un PAT temporal en desarrollo
      },
      body: JSON.stringify({
        message: "Trigger update",
        content: btoa(JSON.stringify(newContent, null, 2)),
        sha: fileData.sha,
        branch
      })
    });

    console.log("🔁 Gatillo activado correctamente.");
  } catch (err) {
    console.error("Error al activar el gatillo:", err);
  }
}

    if (response.ok) {
      console.log("✅ Workflow ejecutado correctamente.");
      // Esperamos unos segundos para que el JSON se actualice y lo recargamos
      setTimeout(getGlobalCount, 6000);
    } else {
      const error = await response.text();
      console.error("❌ Error al ejecutar el workflow:", error);
    }
  } catch (err) {
    console.error("Error en triggerWorkflow:", err);
  }
}


// --- Inicialización y lógica de reproducción ---
if (audio && playCountEl && playCountDiv) {
  // Leer el contador local
  let playCount = parseInt(localStorage.getItem('auroraPlayCount') || '0', 10);

  // Mostrar el valor actual
  playCountEl.textContent = playCount;
  getGlobalCount(); // Muestra el valor global al cargar

  // --- Evento: cuando se da "play" al audio ---
  audio.addEventListener('play', () => {
    // 1️⃣ Aumentar contador local
    playCount++;

    // 2️⃣ Guardar nuevo valor
    localStorage.setItem('auroraPlayCount', playCount);

    // 3️⃣ Mostrar texto actualizado
    playCountEl.textContent = playCount;

    // 4️⃣ Disparar actualización del contador global
    triggerWorkflow();

    // 5️⃣ Animaciones visuales (efecto “tuanis”)
    audio.classList.add('playing');
    playCountDiv.classList.add('updated');

    setTimeout(() => {
      audio.classList.remove('playing');
      playCountDiv.classList.remove('updated');
    }, 700);
  });
}
