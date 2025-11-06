# 🌌 Equipo Aurora — Plataforma Interactiva de Audio y Videollamadas Web

---

## 🧭 1. Descripción General

**Equipo Aurora** es una plataforma web experimental que integra **transmisión de audio** y **videollamadas peer-to-peer (P2P)** mediante tecnologías abiertas como **WebRTC** y **Socket.io**, desplegadas en una arquitectura distribuida entre **GitHub Pages**, **Vercel** y **Render**.

El proyecto explora la interacción entre frontend, backend y servicios en la nube para demostrar la **viabilidad de comunicaciones multimedia en tiempo real** con herramientas libres y de bajo costo.

**Relevancia tecnológica:**  
- Conecta ingeniería eléctrica, sistemas embebidos y comunicación digital.  
- Promueve prácticas de sostenibilidad tecnológica y descentralización.  
- Aplica fundamentos de **NAT traversal**, **STUN/TURN** y **WebRTC signaling**.

---

## 🎯 2. Objetivos del Proyecto

### Objetivo General
Diseñar y desplegar una aplicación web que permita **reproducir audio**, **contabilizar reproducciones globales** y establecer **videollamadas P2P** utilizando únicamente tecnologías web abiertas.

### Objetivos Específicos
- Integrar un sistema de backend ligero basado en Node.js y Socket.io.  
- Implementar un flujo de señalización WebRTC funcional sobre redes NAT.  
- Desplegar servicios en GitHub Pages (frontend) y Render (backend).  
- Registrar métricas de interacción usando GitHub Actions.  
- Aplicar principios de sostenibilidad digital y software libre.

---

## 🏗️ 3. Arquitectura del Sistema

La arquitectura está compuesta por tres capas:

+---------------------------------------------------------------+
| FRONTEND (GitHub Pages / Vercel) |
| - HTML5, CSS3, JS |
| - Interfaz de usuario, reproductor de audio, videollamada |
| - Fetch al contador global y conexión WebRTC |
+------------------------↑-----------------------↑---------------+
| |
| Signaling | Data Exchange (P2P)
↓ ↓
+---------------------------------------------------------------+
| BACKEND (Render) |
| - Node.js + Socket.io |
| - Manejo de salas, ofertas, respuestas y candidatos ICE |
+------------------------↑--------------------------------------+
|
| API / Trigger (GitHub, Vercel)
↓
+---------------------------------------------------------------+
| GITHUB ACTIONS |
| - Incrementa counter.json |
| - Publica cambios en Pages |
+---------------------------------------------------------------+

yaml
Copiar código

### 🛰️ Rol de cada plataforma

| Plataforma       | Función principal                                      |
|------------------|--------------------------------------------------------|
| **GitHub Pages** | Hospeda la interfaz web estática (HTML/CSS/JS).       |
| **Vercel**       | Gestiona API auxiliar y despliegue continuo.          |
| **Render**       | Ejecuta el servidor Node.js con Socket.io (señalización). |
| **STUN Google**  | Permite obtener direcciones públicas en redes NAT.    |
| **WebRTC**       | Canal directo P2P entre clientes.                     |

---

## 🧰 4. Tecnologías y Herramientas Utilizadas

| Tecnología / Servicio | Versión | Propósito |
|------------------------|---------|------------|
| **HTML5 / CSS3 / JS** | — | Interfaz gráfica y lógica cliente. |
| **Node.js** | 22.x | Entorno de ejecución del backend. |
| **Socket.io** | 4.7.5 | Comunicación en tiempo real cliente-servidor. |
| **WebRTC** | — | Conexión P2P para video/audio. |
| **Render** | — | Despliegue del servidor de señalización. |
| **Vercel** | — | API auxiliar y medición de rendimiento (Speed Insights). |
| **GitHub Pages** | — | Hosting estático del sitio principal. |
| **Google STUN Server** | — | Intercambio de candidatos ICE (stun.l.google.com:19302). |
| **JSON / GitHub Actions** | — | Persistencia del contador global de reproducciones. |

---

## 📂 5. Estructura del Proyecto

GB_DEVS/
├── index.html # Página principal (interfaz del usuario)
├── styles.css # Estilos generales y animaciones
├── script.js # Lógica de audio, video y eventos
├── server/
│ ├── server.js # Servidor Node.js (Socket.io + WebRTC)
│ ├── package.json # Dependencias y scripts
├── counter.json # Contador global de reproducciones
├── .github/
│ └── workflows/
│ └── auto-update.yml # Automatización GitHub Actions

markdown
Copiar código

---

## 🔄 6. Flujo de Comunicación

1. **Audio y contador global**
   - Usuario reproduce audio.
   - `script.js` actualiza el contador local y envía un `POST` a la API en Vercel.
   - GitHub Actions incrementa `counter.json`.

2. **Videollamada (WebRTC)**
   - Usuario A crea una sala y obtiene acceso a cámara/micrófono.
   - Socket.io (Render) maneja el intercambio de señales (`offer`, `answer`, `candidate`).
   - Usuario B se conecta y se establece el canal **P2P**.

3. **STUN Server**
   - Google STUN ayuda a los peers a descubrir sus IP públicas y puertos.
   - Si la red es muy restrictiva, se requeriría un TURN server adicional.

### Esquema de flujo
Usuario A → GitHub Pages → Render (Socket.io) → Usuario B
Usuario A ↔ Usuario B (canal P2P WebRTC)

---

## 🔒 7. Seguridad y Permisos

- **HTTPS obligatorio:** tanto en Render como en GitHub Pages.  
- **Permisos de cámara y micrófono:** solicitados dinámicamente vía `navigator.mediaDevices.getUserMedia()`.  
- **Tokens y variables de entorno:** gestionadas en Render/Vercel (`process.env`).  
- **Sin exposición pública de credenciales** en el código fuente.

---

## ⚙️ 8. Limitaciones y Posibles Mejoras

| Limitación | Posible mejora |
|-------------|----------------|
| Dependencia de STUN público | Añadir un servidor TURN propio (coturn). |
| Conexiones NAT estrictas pueden fallar | Implementar fallback TURN. |
| Sin autenticación de usuarios | Integrar OAuth o WebAuthn. |
| Sin grabación de sesiones | Agregar MediaRecorder API. |
| Contador no en tiempo real | WebSocket directo entre Vercel y Pages. |

---

## 🚀 9. Ejecución Local y Despliegue

### 🔧 Ejecución local
```bash
git clone https://github.com/koalami/GB_DEVS.git
cd GB_DEVS/server
npm install
node server.js
Luego, abre index.html en tu navegador (HTTPS recomendado).

☁️ Despliegue en la nube
Render: crea un nuevo servicio web, selecciona el repositorio y apunta a server.js.

Vercel: enlaza el repositorio y define API routes si aplica.

GitHub Pages: habilita Pages para servir index.html.

Configura variables ambientales (PORT, NODE_ENV, etc.).

📚 10. Referencias Bibliográficas
MDN Web Docs – WebRTC API

Socket.io Documentation

Render Deployment Docs

Vercel Docs

RFC 5245 – ICE: Interactive Connectivity Establishment

Google Public STUN/TURN Servers

👥 11. Autores y Colaboradores
Nombre	Rol	Institución
Miguel Chaves	Desarrollador principal	Ingeniería Eléctrica — Sistemas de Comunicación, UCR
Good Boy Devs	Colaboración creativa	Equipo Aurora

💭 12. Reflexión Final
Este proyecto representa una integración funcional entre frontend, backend y servicios cloud, demostrando que es posible construir plataformas multimedia interactivas de bajo costo utilizando herramientas open source.

Su desarrollo fortalece competencias en:

Protocolos de señalización WebRTC y redes NAT.

Despliegue multi-servicio (GitHub + Vercel + Render).

Diseño modular, resiliente y sostenible de sistemas distribuidos.

“La ingeniería moderna no solo conecta circuitos, sino personas.”

📘 Repositorio: https://github.com/koalami/GB_DEVS











# Plataforma de audio
Pagina Web Team Aurora
Laboratorio de Transmisión de Datos
Este proyecto coincide con un laboratorio universitario que busca cumplir las condiciones de el TDR: Plataformas de streaming de audio y video por Internet
Index.html - Lenguaje de hipertexto genera la estructura del texto, script.js Corre los Locales por lo que lleva gran parte de la estetica dinamica- ademas del fetch que se carga por vercel para manter seguro y activo github actions, vercel genera su propio despligue pero se tiene activo github pages al mismo tiemo, Styles.css Corresponde a la estetica y diseño, la salsita maggy.


Attm: Miguel Chaves Bejarano.
