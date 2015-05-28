function ClientServerModel() {
	self.socket = {};

	self.connectToServer = function()
	{
		console.log("laczy");

		self.socket = new WebSocket("ws://127.0.0.1:9999", "echo-protocol");

		self.socket.addEventListener("open", function(event)
		{
		    console.log("Connected");
		});

		self.socket.addEventListener("message", function(event)
		{
		    console.log("nadeszla wiadomość z serwera: ", event.data);
		    // odbiór wiadomości z serwera
		    if(event.data)
		    {
		    	/*
					Komendy:
						1 - stwórz gracza
						2 - przesuń gracza
						3 - gracz niedostpny / opuścił grę
						4 - strzał
		    	*/
		    	if(event.data.command==1)
		    	{
		    		self.CreateUser(event.data.id, event.data.name);
		    		console.log("Gracz ", event.data.name, "dołączył do gry")
		    	}else if(event.data.command==2)
		    	{
		    		var player = self.getPlayer(event.data.id);
		    		player.fly(event.data.x, event.data.y);
		    		console.log("Gracz ", player.name, "przesunal sie o ", event.data.x, event.data.y)
		    	}else if(event.data.command==3)
		    	{
		    		var player = self.getPlayer(event.data.id);
		    		console.log("Gracz ", player.name, "odszedł z gry");
		    		player.destroy();
		    	}else if(event.data.command==4)
		    	{
		    		var player = self.getPlayer(event.data.id);
		    		console.log("Gracz ", player.name, "oddał strzał");
		    	}
		    }
		});

		self.socket.addEventListener("error", function(event)
		{
		    alert('Error');
		    console.log("error", event);
		});

		self.socket.addEventListener("close", function(event)
		{
		    console.log("Not Connected");
		});
	}


	$("#closeConnect").bind("click", function(event)
	{
	    self.socket.close();
	    console.log("close")
	});

	$("#sendMessage").bind("click", function(event)
	{
	    var text = "placuszki";
	    send(text, function(res){console.log("poszlo",res)})
	});


	var send = function (message, callback)
	{
	      console.log("send message", message)
	      waitForConnection(function ()
	      {
	      	for(var i = 0; i<2; i++)
	      	{
	          setInterval(function () {
	              self.socket.send(message);
	          }, 40);
	        }
	          console.log("poszlo");
	          if (typeof callback !== 'undefined') {
	            callback();
	          }
	      }, 1000);
	};

	var waitForConnection = function (callback, interval)
	{
	      if (self.socket.readyState === 1) {
	          console.log("zaczyna");
	          callback();
	      } else {
	          console.log("cos nie tak", self.socket.readyState, self.socket)
	          var that = this;
	          // optional: implement backoff for interval here
	          setTimeout(function () {
	              waitForConnection(callback, interval);
	          }, interval);
	      }
	}

	$("#connect").bind('click', self.connectToServer);
}