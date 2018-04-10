import socketio from 'socket.io';
import http from 'http';

module.exports = function startServer(cb) {
  const server = http.createServer();
  server.listen(7721, 'localhost');
  const io = socketio(server);
  io.origins('*:*');
  io.on('connection', socket => {
    socket.on('sign', data => {
      cb(socket.request.headers.referer, data, socket);
    });
  });
};
