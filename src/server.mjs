import WebSocket, { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 3030 });

wss.on("connection", function connection(ws) {
  ws.on("message", function message(data) {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});
