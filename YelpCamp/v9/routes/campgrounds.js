const express       = require('express'),
      Campground    = require('../models/campground'),
      router        = express.Router();

router.get('/', (req, res)=>{
    Campground.find({}, (err, campgrounds)=>{
        if (err) throw err;
        res.render('campgrounds/index', {campgrounds:campgrounds});
    })
});

router.post('/', isLoggedIn , (req, res) =>{
    let author = {
        id: req.user._id,
        username: req.user.username
    }
    Campground.create({
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        author: author
    }, (err)=> { if (err) throw err});
    res.redirect('/campgrounds');
});

router.get('/new', isLoggedIn , (req, res) =>{
    res.render('campgrounds/new');
});

router.get('/:id', (req, res)=>{
    Campground.findById(req.params.id).populate('comments').exec((err, foundCampground)=>{
        if(err)throw err;
        res.render('campgrounds/show', {campground:foundCampground});
    });
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return(next());
    }
    res.redirect('/login');
}

module.exports = router;