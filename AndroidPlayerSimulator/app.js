var express = require('express');
var path = require('path');


var app = express();

app.use(express.static('resources'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', function (req, res) {
	res.render('index', {
		title: 'PlayerSimulator'
	});
})

app.listen(1337, function () {
	console.log('ready on port 1337');
})