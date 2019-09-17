var express = require('express');
var app = express();

app.get('/', function(req, res){
    res.render("index.ejs");
});

app.listen(1808, function(){
    console.log('Server online!');
});