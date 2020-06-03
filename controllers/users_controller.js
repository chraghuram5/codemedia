module.exports.profile=function(req,res){
    return res.render('user_profile',{
        title:"User Profile"
    });
}

module.exports.signUp=function(req,res){
    return res.render('user_sign_up',{
        title: "Codemedia | SignUp"
    });
}

module.exports.signIn=function(req,res){
    return res.render('user_sign_in',{
        title: "Codemedia | SignIn"
    })
}

//get the sign up details
module.exports.create=function(req,res){
    //Todo later
}


//sign in and create a session for the user
module.exports.createSession=function(req,res){
    //ToDo
}