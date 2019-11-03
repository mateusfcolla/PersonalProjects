// Mongoose connect:
const mongoose = require('mongoose'),
      Post     = require('./models/post'),
      User     = require('./models/user');

mongoose.connect('mongodb://localhost:27017/blogdemo_2', {useFindAndModify: false, useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

// Insert: 

// var newUser = new User({
//     email: 'masterxeff@jeef.nam',
//     name: 'Xeff'
// });
// newUser.posts.push({
//     title: 'XON XEF',
//     content: 'XIN XON XUN post malone'
// })
// newUser.save((err, user)=>{
//     if(err)throw err;
//     console.log(user);
// });
// User.findOne({name: 'Xeff'}, (err, user)=>{
//     if(err) throw err;
//     user.posts.push({
//         title: 'Xoin Xin',
//         content: '-asian'
//     });
//     console.log(user);
// });
// var newPost = new Post({
//     title: 'Me jamo jef',
//     content: 'So many jef yep'
// });

// newPost.save((err, post)=>{
//     if(err)throw err;
//     console.log(post)
// });