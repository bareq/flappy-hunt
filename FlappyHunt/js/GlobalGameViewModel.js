function GlobalGameViewModel() {
	var self=this;
	self.users = ko.observable([]);
	self.birds = ko.observable([]);
	self.viewfinder = ['celownik_czarny', 'celownik_czerwony', 'celownik_fiolet', 'celownik_niebieski', 'celownik_zielony'];
	//self.viewFlappy = ['flappy_yellow_1','flappy_green','flappy_red'];
    self.viewFlappy = ['flappy_yellow_0'];
    self.course = ['right', 'left', 'top'];


	//inicjalizujemy klasę odpowiadającą za połączenie z serwerem ;)
	self.clientServer = new ClientServerModel();

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

	// KONTROLA ROZMIARU OKNA
	$(window).resize(function(){
		self.windowHeight(innerHeight);
		self.windowWidth(innerWidth);
	});

}
