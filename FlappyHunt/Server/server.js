var sys = require("sys"),
my_http = require("http");

var WebSocketServer = require('websocket').server;

var mobileDevicesServer = my_http.createServer(function(request,response){
    response.writeHeader(200, {"Content-Type": "text/plain"});
    response.write("FlappyHunt is running. Server for mobile devices, port: 33333");
    sendMessage("ELO ELO 320");
    response.end();
});

mobileDevicesServer.listen(33333, function() {
    console.log("Server Running on 33333 to mobile device communication");
});

wsMobileDeviceServer = new WebSocketServer({
        httpServer: mobileDevicesServer
    });

wsMobileDeviceServer.on('request', function(request) {
	console.log("New connection...");
    var connection = request.accept(null, request.origin);

    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log("income: " + message.utf8Data);
        }
    });

    connection.on('close', function(connection) {
        console.log("Connection closed");
    });
});

/********************************************************
*********************************************************/

var frontEndServer = my_http.createServer(function(request,response){
    response.writeHeader(200, {"Content-Type": "text/plain"});
    response.write("FlappyHunt is running!");
    sendMessage("ELO ELO 320");
    response.end();
});

frontEndServer.listen(9999, function() {
    sys.puts("Server Running on 9999 to frontend communication");
});

wsFrontEndServer = new WebSocketServer({
        httpServer: frontEndServer
    });

wsFrontEndServer.on('request', function(request){
    
    console.log("New connection from origin " + request.origin);
    
    var connection = request.accept('echo-protocol', request.origin);
    
    console.log(' Connection accepted from ' + connection.remoteAddress);
    
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log('Received Message: ' + message.utf8Data);
            connection.sendUTF(message.utf8Data + " cos");
        }
        else if (message.type === 'binary') {
            console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
            connection.sendBytes(message.binaryData);
        }
    });
    
    
    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});



var sendMessage = function( message ) {
    console.log("Wysylam wiadomosc");   
}


