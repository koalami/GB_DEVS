import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // en producción, pon tu dominio de vercel o github pages
    methods: ["GET", "POST"]
  }
});

// ✅ Si visitas la URL, verás que el servidor está activo
app.get("/", (req, res) => {
  res.send("Servidor de señalización WebRTC de Equipo Aurora activo 🚀");
});

// 🔁 Comunicación WebRTC entre pares
io.on("connection", (socket) => {
  console.log("🟢 Nuevo cliente conectado:", socket.id);

  socket.on("join", (room) => {
    socket.join(room);
    socket.to(room).emit("ready");
  });

  socket.on("offer", (data) => {
    socket.to(data.room).emit("offer", data.offer);
  });

  socket.on("answer", (data) => {
    socket.to(data.room).emit("answer", data.answer);
  });

  socket.on("candidate", (data) => {
    socket.to(data.room).emit("candidate", data.candidate);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Cliente desconectado:", socket.id);
  });
});

const PORT = process.env.PORT || 10000;
server.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
