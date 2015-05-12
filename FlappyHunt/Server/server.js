require("./FrontEndServer.js")
require("./MobileServer.js")
var sys = require("sys");

// Uruchamiam serwer dla frontendu
sys.puts("|-------> Uruchamiam serwer FrontEnd...");
var frontEndServer = new FrontEndServer();
frontEndServer.start();

sys.puts("|-------> Oczekuję na podłączenie klienta FrontEnd...");
while( !frontEndServer.isReady() ) {
    // Oczekuję na podłączenie klienta
}

// Uruchamiam serwer dla aplikacji mobilnych
sys.puts("|-------> Oczekuję na klientów mobilnych...")
var mobileClientServer = new MobileClientServer();
mobileClientServer.start();
