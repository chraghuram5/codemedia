const express=require('express');
const port=8000;
const app=express();
const expressLayouts=require('express-ejs-layouts');

app.use(express.static('./assets'));

//use it before routes
app.use(expressLayouts);

//extract styles and scripts from subpages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//tells app to use express router
//use express router
app.use('/',require('./routes/index'));

app.set('view engine','ejs');
app.set('views','./views');

app.listen(port, function(err){
    if(err){
        console.log(`error starting server on port: ${port}`);
        return;
    }

    console.log(`server running on port: ${port}`);
})