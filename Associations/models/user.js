// Mongoose connect:
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/blogdemo', {useFindAndModify: false, useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

// User - Email, Name:
const userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }]
});

module.exports = mongoose.model('User', userSchema);