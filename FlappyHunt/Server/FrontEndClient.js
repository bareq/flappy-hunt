var sys = require("sys"),
    my_http = require("http");
var WebSocketServer = require('websocket').server;


module.exports = FrontEndClient = function(connection) {
    // Nazwa gracza
    this.name = "FrontEndClient";
    // Połączenie gracza
    this.connection = connection;
    // Inicjalizacja socketa(przypisanie listenerów itp)
    this.initialize();
}

FrontEndClient.prototype.initialize = function() {
    self = this;
    // Kiedy gracz wysyła wiadomość
    this.connection.on('message', function(message) {
        self.onMessage(message);
    });

    // Kiedy gracz zamyka połączenie
    this.connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Klient ' + connection.remoteAddress + ' został rozłączony.');
    });

}

FrontEndClient.prototype.onMessage = function(message) {
    if (message.type === 'utf8') {
        console.log('|-----> Wiadomość od klienta ' + this.name + ': ' + message.utf8Data);
    } else if (message.type === 'binary') {
        console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
    }
}
