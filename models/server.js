const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');

class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = http.createServer(this.app);
    this.io = socketio(this.server, {/* config */});
  }

  middlewares() {
    this.app.use(express.static(path.resolve(__dirname, '../public')));

  }

  socketsConfig(){
    new Sockets(this.io);
  }

  execute() {
    this.middlewares();
    this.socketsConfig();
    this.server.listen(this.port, () => {
      console.log('Server running on port :', this.port)
    });
  }
}

module.exports = Server;