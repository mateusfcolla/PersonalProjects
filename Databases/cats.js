const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/cat_app", { useNewUrlParser: true, useUnifiedTopology: true});

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var characterSchema = new mongoose.Schema({
    name: String,
    movie: String,
    year: Number,
    gen_color: String
});
var Character = mongoose.model("Character", characterSchema);
var Cat = mongoose.model("Cat", catSchema);

Character.create({
    name: "Shrek",
    movie: "Shrek Forever",
    year: 2015,
    gen_color: "Green"
},(err, character)=>{
    if(err) throw err;
    console.log("Character Added!");
});

//adding a cat to the DB

//retrieve all cats from the DB and console.log each one