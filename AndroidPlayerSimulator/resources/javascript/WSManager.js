function WSManager(){
	this.socket = null;
}

WSManager.prototype = {
	connect: function(serwer, port, callback){
		if(this.socket != null){
			this.socket.close()
		};
		socket = new WebSocket("ws://"+serwer+":"+port, 'echo-protocol');
		socket.onopen = function(){
			if (typeof callback !== 'undefined'){
				callback("Połączono z ws://"+serwer+":"+port);
			}
		};
		socket.onmessage = function(message){

		};
		socket.onclose = function(){

		};

	},
	disconnect: function(){

	}
}