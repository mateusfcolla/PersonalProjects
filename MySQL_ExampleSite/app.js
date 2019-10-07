const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const fs = require('fs');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());

const favicon = require('serve-favicon');
const path = require('path');
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico') ) );


                                /* How to use MySQL with NodeJS BASICS */
/* ---------------------------------------------------------------------------------------------------------------------------------*/
const mysql = require('mysql'); // STEP 1 - install and require MySQL

// STEP 2 - create a connection:
const db = mysql.createConnection({
    host    : 'localhost',
    user    : 'root',
    // password: '',        | if exists, you have to put your password
    database: 'mydatabase' // Just use this after you created your database in PHPMyAdmin or whatever
});

// STEP 3 - connect to the database
db.connect((err) =>{
    // You'll find the following command all through the connections, what it does is:
    // It verifies if there is and error and if there is, 'console.log' it.
    if(err) throw err; 
    console.log('MySQL Connected!');
});

// STEP 4 - use 'app.get' to execute a command
app.get('/createtable', (req, res) =>{
    // STEP 4.1 - put the command you want to execute inside a variable
    let sql = 'CREATE TABLE posts(id_post int primary key auto_increment, title varchar(200),'+
    'content varchar(1000), author varchar(50), img varchar(500));';
    // STEP 4.2 - use the following command to execute the command
    db.query(sql, (err, result) => {
       if(err) throw err;
       console.log(result);
       res.send('Posts table created!'); 
    });
});

// STEP 5 - insert data into the DB
app.get('/addpost', (req, res) =>{
    // STEP 5.1 - put the data into a variable
    let post = {title: 'Post 1', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam laoreet tortor sed tincidunt rhoncus. Vestibulum semper vel augue eget gravida. Sed ut rhoncus enim, finibus facilisis urna. Aliquam non varius felis. Curabitur fermentum pretium mattis. Fusce cursus ante ac ligula bibendum, a luctus dolor sodales. Cras vel interdum felis. Etiam interdum mi hendrerit enim tempor, nec consequat risus consequat. Pellentesque neque ante, pharetra id faucibus nec, elementum cursus erat. Aenean ut dolor ut metus placerat feugiat a ullamcorper metus. Morbi scelerisque bibendum lacus at iaculis. Vivamus in enim eu ante pharetra rutrum sed vel enim. Duis enim quam, tincidunt eleifend diam lacinia, hendrerit porta magna. ' ,
    author: 'Jeff', img: 'https://i.kym-cdn.com/entries/icons/original/000/016/894/mynameehhjeff.jpg'};
    // STEP 5.2 - put the command into a variable with 'SET ?' in the end
    let sql = 'INSERT INTO posts SET ?';
    // STEP 5.3 - execute the command
    let query = db.query(sql, post, (err, results) =>{
        if(err) throw err;
        console.log(results);
        res.send('Post added!');
    });
});

// STEP 6 - use data from your DB
app.get('/showTable', (req, res)=>{
    // STEP 6.1 - put the command insite a variable
    let sql = 'SELECT * FROM posts';
    // STEP 6.2 - Execute it
    let query = db.query(sql, (err, results)=>{
        if(err) throw err;
        console.log(results);
        res.send(results);
    });
});

                                /* Bonus step */
/* ---------------------------------------------------------------------------------------------------------------------------------*/

// EXAMPLE STEP - create a database through an app.get
app.get('/createdatabase', (req, res) =>{
    let sql = 'CREATE DATABASE mydatabase';
    db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send('Database Created!');
    });
});

/* ---------------------------------------------------------------------------------------------------------------------------------*/

                                /* SITE EXAMPLE */ 

var position;

app.get('/', (req, res) =>{
    let sql = 'SELECT * FROM posts';
    let query = db.query(sql, (err, results)=>{
        if(err) throw err;
        res.render('home', {data:results});
    });

});

app.get('/newPost', (req, res) =>{
    res.render('newPost');
});

app.post('/addPost', (req, res) =>{
    let imageUploaded = req.files.inputFile1;
    imageUploaded.mv('public/images/' + imageUploaded.name), (err) => {
        if(err) throw err;
        console.log('Image successfully uploaded!');
    };
    let pathImg = ('images/'+imageUploaded.name);
    let newPost = {title: req.body.inputTitle1, content: req.body.inputContent1, author: req.body.inputAuthor1, img: pathImg};
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, newPost, (err, results) =>{
        if(err) throw err;
        console.log(results);
        res.redirect('/newPost');
    });
});

app.get('/editPage/:id', (req, res) => {
    let id = req.params.id;
    // Select: 
    let sqlSelect = `SELECT * FROM posts WHERE id_post= ${id}`;
    let resSelect;
    let query = db.query(sqlSelect, (err, results)=>{
        if(err) throw err;
        resSelect = results;
        console.log(results);
          
        res.render('editPost', {data:resSelect, id:id});
  
    });

})

app.post('/EditPost/:id', (req, res) =>{
    id = req.params.id;
    //Edit Title: 
    let newTitle = req.body.editTitle;
    let sqlEditTitle = `UPDATE posts SET title = '${newTitle}'WHERE id_post= ${id}`;
    let resEditTitle;
    let queryEditTitle = db.query(sqlEditTitle, (err, results)=>{
        if(err) throw err;
        resEditTitle = results;
        console.log(results);
    });

    //Edit Content: 
    let newContent = req.body.editContent;
    let sqlEditContent = `UPDATE posts SET content = '${newContent}'WHERE id_post= ${id}`;
    let resEditContent;
    let queryEditContent = db.query(sqlEditContent, (err, results)=>{
        if(err) throw err;
        resEditContent = results;
        console.log(results);
    });
    // Verify if image were changed:
    // Delete the old image:
    let sqlSelectImage = `SELECT img FROM posts WHERE id_post= ${id}`;
    let resSelectImage;
    let query = db.query(sqlSelectImage, (err, result)=>{
        if(err) throw err;
        resSelectImage = result;
        console.log(resSelectImage);
    });
    //Edit Image:
    let newImage = req.files.editFile;
    let newPathImage = ('images/'+newImage.name);
    newImage.mv('public/images/'+newImage.name), (err) => {
        if(err) throw err;
        console.log('Image successfully uploaded!');
    };

    let sqlEditImage = `UPDATE posts SET img = '${newPathImage}'WHERE id_post= ${id}`;
    let queryEditImage = db.query(sqlEditImage, (err, results)=>{
        if(err) throw err;
        console.log(results);
    });
    //Edit Author: 
    let newAuthor = req.body.editAuthor;
    let sqlEditAuthor = `UPDATE posts SET author = '${newAuthor}'WHERE id_post= ${id}`;
    let resEditAuthor;
    let queryEditAuthor = db.query(sqlEditAuthor, (err, results)=>{
        if(err) throw err;
        resEditAuthor = results;
        console.log(results);
        res.redirect(`/`);
    });
});

app.get('/deletePost/:id', (req, res) =>{
    let sql = `DELETE FROM posts WHERE id_post= ${req.params.id}`;
    let query = db.query(sql, (err, results) =>{
        if(err) throw err;
        console.log(results);
        res.redirect('/');
    });
});


app.listen(1808, () =>{
    console.log('Server online!');
});