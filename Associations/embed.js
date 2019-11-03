// Mongoose connect:
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/restful_blog_app', {useFindAndModify: false, useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
// Post - Title, Content:
const postSchema = new mongoose.Schema({
    title: String,
    content: String
});
const Post = mongoose.model('Post', postSchema);
// User - Email, Name:
const userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});
const User = mongoose.model('User', userSchema);
// Insert: 

// var newUser = new User({
//     email: 'manamjef@jeef.nam',
//     name: 'Jeff'
// })
// newUser.save((err, user)=>{
//     if(err)throw err;
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