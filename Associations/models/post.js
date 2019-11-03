// Mongoose connect:
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/blogdemo', {useFindAndModify: false, useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

// Post - Title, Content:
const postSchema = new mongoose.Schema({
    title: String,
    content: String
});

module.exports = mongoose.model('Post', postSchema);