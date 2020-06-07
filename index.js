const express=require('express');
const port=8000;
const app=express();
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
const cookieParser=require('cookie-parser');

//used for session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const MongoStore=require('connect-mongo')(session);
const sassMiddleware=require('node-sass-middleware');


app.use(sassMiddleware({
    src:'./assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));


//extract styles and scripts from subpages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//use it before routes
app.use(expressLayouts);

app.set('view engine','ejs');
app.set('views','./views');

//mongoStore is used to store the session cookie in the db
app.use(session({
    name: 'codemedia',
    //change the secret before deployment in production mode
    secret: 'something',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000* 60* 100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
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