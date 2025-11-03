// ==============================
// 🟣 EQUIPO AURORA – SCRIPT MEJORADO
// ==============================

// ==============================
// ✨ PARTÍCULAS ANIMADAS
// ==============================
function createParticles() {
  const particlesContainer = document.getElementById('particles');
  if (!particlesContainer) return;

  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 8 + 's';
    particle.style.animationDuration = (Math.random() * 5 + 5) + 's';
    particlesContainer.appendChild(particle);
  }
}

// ==============================
// 🎯 HEADER SCROLL EFFECT
// ==============================
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// ==============================
// 🎬 FADE IN ON SCROLL
// ==============================
function initFadeInAnimation() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// ==============================
// 💬 FRASES ALEATORIAS
// ==============================
function initRandomQuote() {
  const quotes = [
    '"The greatest threat to our planet is the belief that someone else will save it." – Robert Swan',
    '"Innovation is seeing change as an opportunity, not a threat." – Steve Jobs',
    '"Doing more with less is compassionate and enduring." – Paul Hawken',
    '"Sustainability is about doing more good." – Jochen Zeitz'
  ];
  
  const quoteEl = document.getElementById('quote');
  if (quoteEl) {
    quoteEl.textContent = quotes[Math.floor(Math.random() * quotes.length)];
  }
}

// ==============================
// 📅 AÑO AUTOMÁTICO EN FOOTER
// ==============================
function initFooterYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

// ==============================
// 🎵 REPRODUCTOR DE AUDIO
// ==============================
const AudioPlayer = {
  // Configuración
  config: {
    GITHUB_USERNAME: "koalami",
    GITHUB_REPO: "GB_DEVS",
    API_URL: "https://gb-devs.vercel.app/api/updateCounter"
  },

  // Referencias DOM
  elements: {
    audio: null,
    playCountEl: null,
    playCountDiv: null,
    totalDiv: null
  },

  // Estado
  playCount: 0,

  // Inicializar
  init() {
    this.elements.audio = document.getElementById('audioPlayer');
    this.elements.playCountEl = document.getElementById('playCount');
    this.elements.playCountDiv = document.getElementById('playCountDiv');
    this.elements.totalDiv = document.getElementById('totalGlobal');

    if (!this.elements.audio || !this.elements.playCountEl || !this.elements.playCountDiv) {
      return;
    }

    // Cargar contador local
    this.playCount = parseInt(localStorage.getItem('auroraPlayCount') || '0', 10);
    this.elements.playCountEl.textContent = this.playCount;

    // Cargar contador global
    this.getGlobalCount();

    // Event listener para reproducción
    this.elements.audio.addEventListener('play', () => this.handlePlay());
  },

  // Obtener contador global
  async getGlobalCount() {
    const counterUrl = `https://${this.config.GITHUB_USERNAME}.github.io/${this.config.GITHUB_REPO}/counter.json`;
    
    try {
      const res = await fetch(`${counterUrl}?t=${Date.now()}`, { cache: "no-store" });
      const data = await res.json();
      if (this.elements.totalDiv) {
        this.elements.totalDiv.textContent = `Total global: ${data.count}`;
      }
    } catch (err) {
      console.error("Error al obtener el contador global:", err);
      if (this.elements.totalDiv) {
        this.elements.totalDiv.textContent = "Total global: Error al cargar";
      }
    }
  },

  // Actualizar contador en servidor
  async triggerSafeUpdate() {
    try {
      const response = await fetch(this.config.API_URL, { method: "POST" });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Error al contactar API Vercel:", errorText);
      } else {
        console.log("🔁 Gatillo activado correctamente vía Vercel");
        // Esperar a que el workflow actualice
        setTimeout(() => this.getGlobalCount(), 8000);
      }
    } catch (err) {
      console.error("Error al activar el gatillo en Vercel:", err);
    }
  },

  // Manejar reproducción
  handlePlay() {
    // Incrementar contador local
    this.playCount++;
    localStorage.setItem('auroraPlayCount', this.playCount);
    this.elements.playCountEl.textContent = this.playCount;

    // Actualizar contador global
    this.triggerSafeUpdate();

    // Animaciones visuales
    this.elements.audio.classList.add('playing');
    this.elements.playCountDiv.classList.add('updated');

    setTimeout(() => {
      this.elements.audio.classList.remove('playing');
      this.elements.playCountDiv.classList.remove('updated');
    }, 700);
  }
};

// ==============================
// 🚀 INICIALIZACIÓN
// ==============================
document.addEventListener('DOMContentLoaded', () => {
  createParticles();
  initHeaderScroll();
  initFadeInAnimation();
  initRandomQuote();
  initFooterYear();
  AudioPlayer.init();
  
  console.log('🌟 Equipo Aurora cargado correctamente');
});
