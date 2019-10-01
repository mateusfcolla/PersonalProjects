const express = require('express');
const mysql = require('mysql');

const app = express();

app.set('view engine', 'ejs');

// To create a connection:
const database = mysql.createConnection({
    host    : 'localhost',
    user    : 'root',
    password: '',
    database: 'mydatabase'
});

// Connect with the database:
database.connect((err) =>{
    if(err){
        console.log(err);
    }
    else{
        console.log("MySQL Connected!");
    }
});

// Create DataBase
app.get('/createdb', (req, res) =>{
    let sql = 'CREATE DATABASE mydatabase';
    database.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send('Database Created!')
    });
});

// Create table
app.get('/createtb', (req, res) =>{
    let sql = 'CREATE TABLE person(id_person int auto_increment primary key, name varchar(200) not null, age int not null)';
    database.query(sql, (err, result) => {
       if(err) throw err;
       console.log(result);
       res.send('Person table created!'); 
    });
});

// Insert person
app.get('/addperson1', (req, res) =>{
    let person = {name: 'Jeff', age: 20}
    let sql = 'INSERT INTO person SET ?';
    let query = database.query(sql, person, (err, results) =>{
        if(err) throw err;
        console.log(results);
        res.send('Person 1 added!');
    });
});

// Select persons
app.get('/showTable', (req, res)=>{
    let sql = 'SELECT * FROM person';
    let query = database.query(sql, (err, results)=>{
        if(err) throw err;
        console.log(results);
        res.send(results);
    });
});

app.listen(1808, () =>{
    console.log('Server online!');
});