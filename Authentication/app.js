const express               = require('express'),
      mongoose              = require('mongoose'),
      passport              = require('passport'),
      bodyParser            = require('body-parser'),
      User                  = require('./models/user'),
      LocalStrategy         = require('passport-local'),
      passportLocalMongoose = require('passport-local-mongoose'),
      methodOverride        = require('method-override'),
      app                   = express();

mongoose.connect('mongodb://localhost:27017/auth_demo_app', {useFindAndModify: false, useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(require('express-session')({ secret: 'Ma nam jef', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Index page route
app.get('/', (req, res)=>{
    res.render('landing');
});

// Secret page route
app.get('/secret', isLoggedIn , (req, res) =>{
    res.render('secret');
});

// SIGN UP ROUTES -----
// Show sign-up form route
app.get('/register', (req, res)=>{
    res.render('user/register');
});

// User sign-up
app.post('/register', (req, res)=>{
    User.register(new User({username: req.body.username}), req.body.password, (err, newUser)=>{
        if(err){console.log(err); return res.render('user/register')};
        passport.authenticate('local')(req, res, ()=>{
            res.redirect('/secret');
        });
    })
});
// SIGN IN ROUTES -----
app.get('/login', (req, res)=>{
    res.render('user/login');
})
// Login logic
app.post('/login', passport.authenticate('local', {
     successRedirect: '/secret',
     failureRedirect: '/login'
    }) , (req, res)=>{
});

// LOGOUT ROUTES
app.get('/logout', (req, res)=>{
    req.logout();
    res.redirect('/');
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

app.listen(3000, ()=>{
    console.log('Server started!');
});