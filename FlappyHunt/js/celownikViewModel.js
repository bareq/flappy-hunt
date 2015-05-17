function celownikViewModel(options ) 
{
	var self = this;
	if(options)
	{
		self.id = options.id || 0;
		self.name = options.name || 0;
	 	self.pos_x = ko.observable(options.start_pos_x || 0);
	 	self.pos_y = ko.observable(options.start_pos_y || 0);
	 	self.img = options.img || "";
	}


	self.fly = function(x, y)
	{
		$( "#"+self.id ).animate({
		    left: "+="+x,
		    top: "+="+y
		  }, 100, function() {
		    // Animation complete.
		});
	}

	self.shoot = function()
	{
		/*
			Pobieramy aktualna pozycję celownika, po czym sprawdzamy czy jakis ptaszek znajduje sie w 
			pozycji strzalu po czym odsylamy odpowiedz do serwera o trafieniu i za ile punktów.
			Aktualizujemy też punkty u każdego gracza. Usuwamy zabitą kaczkę.
		*/
	}

	self.destroy = function()
	{
		var usersTab = DATA.Global.users();
		var index = usersTab.indexOf(self);
		usersTab.splice(index, 1);
		DATA.Global.users(usersTab);
	}

}