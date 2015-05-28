var sys = require("sys");
var WebSocketServer = require('websocket').server;
var player = require("./Player.js")
my_http = require("http");

module.exports = BaseServer = function() {
    // Nazwa serwera
    this.name = "No name";
    // Port na którym będzie nasłuchiwał socket
    this.port = "9999";
    // Lista graczy
    this.players = [];
    // Obiekt serwera
    this.serverObject = null;
    // Obiekt socketa
    this.socketObject = null;
}

BaseServer.prototype.start = function() {
    this.startWebServer();
    this.initializeSocket();
}

BaseServer.prototype.startWebServer = function() {
    var self = this
    this.serverObject = my_http.createServer(function(request, response) {
        self.createServer(request, response);
    });

    this.serverObject.listen(self.port, function() {
        sys.puts(self.helloMessage());
    });
}

BaseServer.prototype.createServer = function(request, response) {
    response.writeHeader(200, {
        "Content-Type": "text/plain"
    });
    response.write(this.helloMessage());
    response.end();
}

BaseServer.prototype.initializeSocket = function() {
    this.socketObject = this.createSocket()
    self = this;
    this.socketObject.on('request', function(request) {
        var connection = request.accept('echo-protocol', request.origin);
        console.log(' |------> Dołączył gracz o IP: ' + connection.remoteAddress);
        // Dodaje obiekt gracza do tablicy
        self.players.push(new Player("Przykładowy login", "Czerwony", connection));

    });
}

BaseServer.prototype.createSocket = function() {
    return new WebSocketServer({
            httpServer: this.serverObject
           });
}

BaseServer.prototype.stop = function() {
    // Funckja zatrzymuje serwer, cholera wie czy się przyda
}

BaseServer.prototype.helloMessage = function() {
    return "Serwer \"" + this.name + "\" zostal uruchomiony na porcie " + this.port;
}
