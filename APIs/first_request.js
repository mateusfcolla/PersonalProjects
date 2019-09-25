var request = require('request');
request('https://jsonplaceholder.typicode.com/users', function(error, response, body){
    if(!error && response.statusCode == 200){
        var parsedData = JSON.parse(body);
        for(var i = 0; i<10; i++){
            console.log('\nUser:')
            console.log(parsedData[i]['name']);
            console.log(parsedData[i]['username']);
            console.log(parsedData[i]['email']);
        }
    }
    else{
        console.log(error);
    }
});

/* http://www.omdbapi.com/?s=guardians+of+the+galaxy&apikey=thewdb
http://www.omdbapi.com/?i=tt3896198&apikey=thewdb */
