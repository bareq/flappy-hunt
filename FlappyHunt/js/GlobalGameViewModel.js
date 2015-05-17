function GlobalGameViewModel() {
	var self=this;
	self.users = ko.observable([]);
	self.birds = ko.observable([]);
	self.viewfinder = ['celownik_czarny', 'celownik_czerwony', 'celownik_fiolet', 'celownik_niebieski', 'celownik_zielony'];
	self.viewFlappy = ['flappy_blue','flappy_green','flappy_red'];
	self.socket = {};

	self.windowHeigth = ko.observable(innerHeight);
	self.windowWidth = ko.observable(innerWidth);

	self.CreateUser = function(id, name)
	{
		var x = Math.floor((Math.random() * 1200) + 50); 
		var y = Math.floor((Math.random() * 450) + 50); 
		var randomImg = Math.floor((Math.random() * self.viewfinder.length) + 0);
		var img = self.viewfinder[randomImg];
		self.viewfinder.splice(randomImg, 1);
		var users = self.users();
		users.push(new celownikViewModel({id: 'player'+self.viewfinder.length, name:name, start_pos_x: x, start_pos_y: y, img: img+'.png'}))
		self.users(users);
	}

	self.CreateFlappy = function()
	{
		var x = Math.floor((Math.random() * 1200) + 50); 
		var y = Math.floor((Math.random() * 450) + 50); 
		var randomImg = Math.floor((Math.random() * self.viewFlappy.length) + 0);
		var img = self.viewFlappy[randomImg];
		self.viewFlappy.splice(randomImg, 1);
		var birds = self.birds();
		console.log(self.viewFlappy.length)
		birds.push(new flappyViewModel({id: 'flappy'+self.viewFlappy.length, name:name, start_pos_x: x, start_pos_y: y, img: img+'.png'}))
		self.birds(birds);
	}

	self.getPlayer = function(id)
	{
		var searchUser = {};
		$.each(self.users(), 
			function(index, user){
				if(user.id==id)
				{
					console.log("to ten którego szukasz: ", user);
					searchUser = user;
				}
			})
		return searchUser;
	}

	self.getFlappy = function(id)
	{
		var searchFlappy = {};
		$.each(self.birds(), 
			function(index, bird){
				if(bird.id==id)
				{
					console.log("to ten którego szukasz: ", bird);
					searchFlappy = bird;
				}
			})
		return searchFlappy;
	}

	self.connectToServer = function()
	{
		self.socket = new WebSocket("ws://192.168.0.22:9999", "echo-protocol");

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

	// KONTROLA ROZMIARU OKNA
	$(window).resize(function(){
		self.windowHeigth(innerHeight);
		self.windowWidth(innerWidth);
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

$( document ).ready( function() {
	DATA = {
		Global: new GlobalGameViewModel()
	}
	ko.applyBindings();
});
