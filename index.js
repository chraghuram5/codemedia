const express=require('express');
const port=8000;

const app=express();

//tells app to use express router
//use express router
app.use('/',require('./routes/index'));

app.listen(port, function(err){
    if(err){
        console.log(`error starting server on port: ${port}`);
        return;
    }

    console.log(`server running on port: ${port}`);
})