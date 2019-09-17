var express = require('express');
var app = express();

app.get('/', function(req, res){
    res.render("index.ejs");
});

app.get('/fallinlovewith/:thing', function(req, res){
    var thing = req.params.thing;
    res.render('love.ejs', {thing : thing});
});

app.get('*', function(req, res){
    res.render('star.ejs');
});

app.listen(1808, function(){
    console.log('Server online!');
});