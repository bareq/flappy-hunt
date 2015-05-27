var sys = require("sys"),
    my_http = require("http");
var WebSocketServer = require('websocket').server;


module.exports = FrontEndClient = function(connection) {
    // Nazwa gracza
    this.name = "FrontEndClient";
    // Połączenie gracza
    this.connection = connection;
    // Client IP address
    this.IP = connection.remoteAddress
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
        console.log('|----------> Klient ' + self.IP + ' został rozłączony.');
    });

}

FrontEndClient.prototype.onMessage = function(message) {
    if (message.type === 'utf8') {
        console.log('|-----> Wiadomość od klienta ' + this.name + ': ' + message.utf8Data);
    } else if (message.type === 'binary') {
        console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
    }
}
