const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/codemedia_development');

const db=mongoose.connection;

db.on('error',console.log.bind(console, "Error connecting to mongoDB"));

db.once('open',function(){
    console.log("Connected to db");
});

module.exports=db;