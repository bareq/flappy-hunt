function flappyViewModel(options ) 
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
	self.interval = '';

	self.randomFly = function()
	{
        var x = Math.floor((Math.random() * 400) - 200); 
		var y = Math.floor((Math.random() * 400) - 200); 
		if((self.pos_x()+x) > (DATA.Global.windowWidth()-50) ||(self.pos_x()+x) < 50)
		{
			x = -x;
		}
		if( (self.pos_y()+y) > (DATA.Global.windowHeigth()-50) || (self.pos_y()+y) < 50)
		{
			y = -y;
		}
		self.flyAnimate(x, y);
	}

	self.flyAnimate = function(x, y)
	{
		var time = 0;
		var bird = $( "#"+self.id );
		var posx = x/80;
		var posy = y/80;

		var interval = setInterval(function () {
			time += 25;
			self.pos_x(self.pos_x()+posx);
			self.pos_y(self.pos_y()+posy);
			bird.css('left', '+='+posx);
			bird.css('top', '+='+posy);
			if(time==2000)
			{
				clearInterval(interval);
				self.randomFly();
			}
	    }, 25);
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

	self.destroy = function()
	{
		var flappyTab = DATA.Global.birds();
		var index = flappyTab.indexOf(self);
		flappyTab.splice(index, 1);
		clearInterval(self.interval);
		DATA.Global.birds(flappyTab);
	}

}