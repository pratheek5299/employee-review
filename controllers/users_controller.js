const User = require('../models/users');

//render the sign up form page
module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/employee/main-view')
    }
    return res.render('user_sign_up',{
        title: 'User Sign Up'
    });
}

//render the sign in form page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/employee/main-view')
    }
    return res.render('user_sign_in',{
        title: 'User Sign In'
    })
}

//create the user and store the user data in the database
module.exports.createUser = async function(req, res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    try{
        let user = await User.create(req.body);
        return res.redirect('/users/sign-in');
    }catch(err){
        console.log(`Error in creating a user ${err}`);
    }
}

//verify the user login details with the ones in the database and create a session
module.exports.createSession = async function(req, res){
    try{
        let user = await User.findOne({email: req.body.email});
        if (user.password != req.body.password){
            return res.redirect('/users/sign-in');
        }
        return res.redirect('/employee/main-view');
    }catch(err){
        console.log('Error in creating a session', err);
    }
}

//sign out functionality
module.exports.destroySession = function(req, res, next){
    req.logout(function(err){
        if(err){
            return next(err);
        }
        return res.redirect('/')
    })
}