var express = require('express');
var app = express();

// "/" => "Hi there!"
app.get("/", function(req, res){
    res.send("Hi there!")
});

// "/bye" => "Goodbye!"
app.get("/bye", function(req, res){
    res.send("Goodbye!");
});

// "/speak/sound" => "The animal's sound"
app.get("/speak/:sound", function(req, res){
    switch(req.params.sound){
        case ('pig'): res.send("Oink"); break;
        case ('cow'): res.send("Moo"); break;
        case ('dog'): res.send("Woof Woof!"); break;
        case ('jeff'): res.send("My nam Jeff"); break;
        default: res.send("Select a sound!"); break;
    }
});

// "/repeat/text/number" => Types the text 'num' amount of times
app.get("/repeat/:text/:number", function(req, res){
    var text = req.params.text;
    var number = parseInt(req.params.number);
    var message = "";

    for(var i = 0; i<number; i++){
        message += " "+text;   
    }
    res.send(message);
});

// "For all pages except those listed above" => "Page not found, sorry!"
app.get("*", function(req, res){
    res.send("Sorry, page not found... What are you doing with your life?");
});

app.listen(1808, function(){
    console.log("Server has started!");
});