var sys = require("sys"),
    my_http = require("http");
var WebSocketServer = require('websocket').server;


module.exports = Player = function(login, color, connection) {
    // Nazwa gracza
    this.login = login;
    // Połączenie gracza
    this.connection = connection;
    // Kolor gracza
    this.color = color;
    // Liczba punktów gracza
    this.score = 0;

    this.initialize();
}

Player.prototype.initialize = function() {
    self = this;
    // Kiedy gracz wysyła wiadomość
    this.connection.on('message', function(message) {
        self.onMessage(message);
    });

    // Kiedy gracz zamyka połączenie
    this.connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });

}

Player.prototype.onMessage = function(message) {
    if (message.type === 'utf8') {
        console.log('|-----> Wiadomość od gracza ' + this.login + ': ' + message.utf8Data);
    } else if (message.type === 'binary') {
        console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
    }
}
