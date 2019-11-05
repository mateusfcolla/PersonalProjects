const express               = require('express'),
      mongoose              = require('mongoose'),
      passport              = require('passport'),
      bodyParser            = require('body-parser'),
      LocalStrategy         = require('passport-local'),
      passportLocalMongoose = require('passport-local-mongoose'),
      methodOverride        = require('method-override'),
      User                  = require('./models/user'),
      app                   = express();

mongoose.connect('mongodb://localhost:27017/auth_demo_app', {useFindAndModify: false, useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res)=>{
    res.render('landing');
});

app.listen(3000, ()=>{
    console.log('Server started!');
})