const express=require('express');
const port=8000;

const app=express();

app.listen(port, function(err){
    if(err){
        console.log(`error starting server on port: ${port}`);
        return;
    }

    console.log(`server running on port: ${port}`);
})