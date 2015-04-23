ko.lazyTemplate.init({
	loader: function (name, callback)
	{
		$.get('/magisterka/masi/flappy_hunt/FlappyHunt/html/'+name+'.tpl',callback);
	}
});


