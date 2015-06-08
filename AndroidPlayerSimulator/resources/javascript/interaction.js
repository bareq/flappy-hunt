$(document).ready( function () {
	var connect = document.getElementById("connect");
	var join = document.getElementById("join");

	var serwer = document.getElementById("serwer");
	var port = document.getElementById("port");
	var username = document.getElementById("username");
	var log = function(message){
		$("#logger").append(message);
	}

	var ws = new WSManager();

	connect.addEventListener("click", function (event) {
		ws.connect(serwer.value, port.value, log);
	});

	join.addEventListener("click", function (event){

	});

	
});