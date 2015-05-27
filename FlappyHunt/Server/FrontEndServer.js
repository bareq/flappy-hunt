var server = require("./BaseServer.js");
var client = require("./FrontEndClient.js");

module.exports = FrontEndServer = function() {
    BaseServer.call(this);
    // Nazwa serwera
    this.name = "FrontEndServer";
    // Port na którym będzie nasłuchiwał socket
    this.port = "9999";
    // Lista graczy
    this.frontEndClient = null;
    // Obiekt serwera
    this.serverObject = null;
    // Obiekt socketa
    this.socketObject = null;
    // Jeżeli klient jest podłączony wartość = True
    this.ready = false;
}

FrontEndServer.prototype = new BaseServer();

FrontEndServer.prototype.initializeSocket = function() {
    this.socketObject = this.createSocket()
    self = this;
    this.socketObject.on('request', function(request) {
        var connection = request.accept('echo-protocol', request.origin);

        console.log(' |------> FrontEnd klient został podłączony: ' + connection.remoteAddress);

        // Dodaje obiekt klienta
        self.frontEndClient = new FrontEndClient(connection);
        self.ready = true;

    });
}

FrontEndServer.prototype.isReady = function() {
    return this.ready;
}
