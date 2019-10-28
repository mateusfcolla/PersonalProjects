const express       = require('express'),
     bodyParser     = require('body-parser'),
     mongoose       = require('mongoose'),
     app            = express();

mongoose.connect('mongodb://localhost/yelp_camp', { useNewUrlParser: true, useUnifiedTopology: true})
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

const Campground = mongoose.model("Campground", campgroundSchema);

app.get('/', (req, res) =>{
    res.render('landing');
})

app.get('/campgrounds', (req, res)=>{
    Campground.find({}, (err, campgrounds)=>{
        if (err) throw err;
        res.render('campgrounds', {campgrounds:campgrounds});
    })
});

app.post('/campgrounds', (req, res) =>{
    Campground.create({
        name: req.body.name,
        image: req.body.image
    }, (err)=> { if (err) throw err});
    res.redirect('/campgrounds');
});

app.get('/campgrounds/new', (req, res) =>{
    res.render('new');
});

app.listen(3000, ()=>{
    console.log('YelpCamp Server has Started!');
})