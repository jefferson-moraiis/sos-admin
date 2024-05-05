import io from "socket.io-client";

const SOCKET_URL = "https://sos-woman-service.onrender.com";

export default function useSocket() {
  const socket = io(SOCKET_URL, { transports: ['websocket'] });

  socket.on('connect', () => {
    console.log("Socket connected:", socket.id);
  });

  socket.on('connect_error', (err) => {
    console.log("Connection Error:", err);
  });

  return socket;
}