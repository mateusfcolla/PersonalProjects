var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render('home');
});

app.post('/addfriend', function(req, res){
    res.send("You've reached the post route!");
});

app.get('/friends', function(req, res){
    var friends = ['Jeff', 'Miranda', 'Justin', 'Pierre', 'Lilly']
    res.render('friends', {friends:friends});
});

app.listen(1808, function(){
    console.log('Server online!');
});