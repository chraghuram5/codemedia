const express=require('express');
const port=8000;
const app=express();
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
const cookieParser=require('cookie-parser');

//used for session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('passport-local');

app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));


//extract styles and scripts from subpages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//tells app to use express router
//use express router
app.use('/',require('./routes/index'));

app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name: 'codemedia',
    //change the secret before deployment in production mode
    secret: 'something',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000* 60* 100)
    }
}))

app.use(passport.initialize());
app.use(passport.session());

//use it before routes
app.use(expressLayouts);

app.listen(port, function(err){
    if(err){
        console.log(`error starting server on port: ${port}`);
        return;
    }

    console.log(`server running on port: ${port}`);
})