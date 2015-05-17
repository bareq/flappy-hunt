ko.lazyTemplate.init({
	loader: function (name, callback)
	{
		$.get('/FlappyHunt/html/'+name+'.tpl',callback);
	}
});


