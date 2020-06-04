const User = require('../models/user');

module.exports.profile = function (req, res) {
    return res.render('user_profile', {
        title: "User Profile"
    });
}

module.exports.signUp = function (req, res) {
    return res.render('user_sign_up', {
        title: "Codemedia | SignUp"
    });
}

module.exports.signIn = function (req, res) {
    return res.render('user_sign_in', {
        title: "Codemedia | SignIn"
    })
}

//get the sign up details
module.exports.create = function (req, res) {

    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log('error in signing up');
            return;
        }

        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) {
                    console.log('error in creating user while signing up');
                    return;
                }

                return res.redirect('/users/sign-in');
            })
        }
        else {
            return res.redirect('back');
        }
    })
}


//sign in and create a session for the user
module.exports.createSession = function (req, res) {

    //steps to authenticate
    //find the user
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log('error in finding user in signing in');
            return;
        }
        //Handle user found
        if (user) {

            //Handle passwords which don't match
            if(user.password!=req.body.password){
                return res.redirect('back');
            }

            //Handle session creation
            res.cookie('user_id',user.id);
            return res.redirect('/users/profile');

        }
        else {
            //Handle user not found
            return res.redirect('back');
        }
    })


}