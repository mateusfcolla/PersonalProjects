const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/cat_app", { useNewUrlParser: true }, { useUnifiedTopology: true });

//adding a cat to the DB

//retrieve all cats from the DB and console.log each one