var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render('landing')
});

app.get('/campgrounds', function(req, res){
    var campgrounds = [
        {name: 'Jeff Jeff', image: 'https://i.kym-cdn.com/photos/images/original/001/271/550/8b6.jpg'},
        {name: 'Shrek Shrek', image: 'https://i.kym-cdn.com/photos/images/original/001/271/550/8b6.jpg'},
        {name: 'Puss in Boots', image: 'https://i.kym-cdn.com/photos/images/original/001/271/550/8b6.jpg'}
    ];
});

app.listen(1808, function(){
    console.log('YelpCamp Server Has Started!');
})