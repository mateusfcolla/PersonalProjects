var express = require('express');
var app = express();
app.set('view engine', 'ejs');



app.listen(1808, function(){
    console.log('Server online!');
});