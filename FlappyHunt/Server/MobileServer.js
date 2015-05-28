var server = require("./BaseServer.js")

module.exports = MobileClientServer = function() {
    BaseServer.call(this);
    // Nazwa serwera
    this.name = "MobileClientServer";
    // Port na którym będzie nasłuchiwał socket
    this.port = "8888";
    // Lista graczy
    this.players = [];
    // Obiekt serwera
    this.serverObject = null;
    // Obiekt socketa
    this.socketObject = null;
}

MobileClientServer.prototype = new BaseServer();
