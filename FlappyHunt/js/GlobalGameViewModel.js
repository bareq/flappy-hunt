function GlobalGameViewModel() {
	var self=this;
	self.users = ko.observable([]);
	self.viewfinder = ['celownik_czarny', 'celownik_czerwony', 'celownik_fiolet', 'celownik_niebieski', 'celownik_zielony'];
	
	self.CreateUser = function(id, name)
	{
		var x = Math.floor((Math.random() * 1200) + 50); 
		var y = Math.floor((Math.random() * 450) + 50); 
		var randomImg = Math.floor((Math.random() * self.viewfinder.length) + 0);
		var img = self.viewfinder[randomImg];
		self.viewfinder.splice(randomImg, 1);
		console.log(self.users());
		var users = self.users();
		users.push(new celownikViewModel({id: self.viewfinder.length, name:name, start_pos_x: x, start_pos_y: y, img: img+'.png'}))
		self.users(users);

	}
}
$( document ).ready( function() {
	ko.applyBindings(new GlobalGameViewModel());
});
