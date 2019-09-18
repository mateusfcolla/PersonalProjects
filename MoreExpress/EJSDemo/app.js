var express = require('express');
var app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render("index");
});

app.get('/fallinlovewith/:thing', function(req, res){
    var thing = req.params.thing;
    res.render('love', {thing : thing});
});

app.get('/posts', function(req, res){
    var posts = [
        { title: 'Post1', author: 'Fiona'},
        { title: 'Post2', author: 'Shrek'},
        { title: 'Post3', author: 'PussInBoots'}
    ];
    res.render('post', {posts : posts});
});

app.get('*', function(req, res){
    res.render('star');
});

app.listen(1808, function(){
    console.log('Server online!');
});