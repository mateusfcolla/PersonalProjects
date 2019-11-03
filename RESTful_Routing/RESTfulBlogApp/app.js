const express       = require('express'),
      bodyParser    = require('body-parser'),
      mongoose      = require('mongoose'),
      app           = express();

mongoose.connect('mongodb://localhost:27017/restful_blog_app', { useNewUrlParser: true, useUnifiedTopology: true});
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

// MONGOOSE/MODEL CONFIG

const blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now},
});

const Blog = mongoose.model('Blog', blogSchema);

// RESTFUL ROUTES

app.get('/', (req, res)=>{
    res.redirect('/blogs');
});

app.get('/blogs', (req, res)=>{
    Blog.find({}, (err, blogs)=>{
        if(err) throw err;
        res.render('index', {blogs, blogs})
    });
});

app.get('/blogs/new', (req, res)=>{
    res.render('new');
});

app.post('/blogs', (req, res)=>{
    // Create blog:
    Blog.create(req.body.blog, (err, blog)=>{
        if(err) throw err;
        console.log(`Created blog!`);
        res.redirect('/');
    });
    
});

app.listen(3000, ()=>{
    console.log('Server running!');
});