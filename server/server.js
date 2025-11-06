// server/server.js
import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" } // permite conexiones desde cualquier origen
});

// cuando un cliente se conecta
io.on("connection", (socket) => {
  console.log("🔗 Nuevo cliente conectado:", socket.id);

  socket.on("join", (room) => {
    socket.join(room);
    console.log(`📞 Cliente ${socket.id} entró en sala ${room}`);
  });

  socket.on("offer", (data) => {
    socket.to(data.room).emit("offer", data);
  });

  socket.on("answer", (data) => {
    socket.to(data.room).emit("answer", data);
  });

  socket.on("ice-candidate", (data) => {
    socket.to(data.room).emit("ice-candidate", data);
  });

  socket.on("disconnect", () => {
    console.log("❌ Cliente desconectado:", socket.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`🚀 Servidor señalización activo en puerto ${PORT}`));
