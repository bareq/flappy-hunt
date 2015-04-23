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


	self.lec = function(x, y)
	{
		$( "#"+self.id ).animate({
		    left: "+="+x,
		    top: "+="+y
		  }, 100, function() {
		    // Animation complete.
		});
	}

}