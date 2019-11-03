const express           = require('express'),
     bodyParser         = require('body-parser'),
     mongoose           = require('mongoose'),
     expressSanitizer   = require('express-sanitizer'),
     methodOverride     = require('method-override'),
     Campground         = require('./models/campground'),
     app                = express();

mongoose.connect('mongodb://localhost:27017/yelp_camp', {useFindAndModify: false, useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(expressSanitizer());

app.get('/', (req, res) =>{
    res.render('landing');
})

app.get('/campgrounds', (req, res)=>{
    Campground.find({}, (err, campgrounds)=>{
        if (err) throw err;
        res.render('index', {campgrounds:campgrounds});
    })
});

app.post('/campgrounds', (req, res) =>{
    Campground.create({
        name: req.body.name,
        image: req.body.image,
        description: req.body.description
    }, (err)=> { if (err) throw err});
    res.redirect('/campgrounds');
});

app.get('/campgrounds/new', (req, res) =>{
    res.render('new');
});

app.get("/campgrounds/:id", (req, res)=>{
    Campground.findById(req.params.id, (err, found)=>{
        if(err)throw err;
        res.render('show', {campground:found});    
    });
});

app.get("/campgrounds/:id/edit", (req, res)=>{
    Campground.findById(req.params.id, (err, found)=>{
        if(err)throw err;
        res.render('edit', {campground:found});    
    });
});

app.put("/campgrounds/:id", (req,res)=>{
    
});

app.listen(3000, ()=>{
    console.log('YelpCamp Server has Started!');
})