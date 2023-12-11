const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/users');

//authentication user passport 
passport.use(new localStrategy({
    usernameField: 'email',
    },
    function(email, password, done){
        //find a user and establish an identity
        User.findOne({email: email}).then(function(user){
            if(!user || user.password != password){
                console.log('Invalid Username/Password');
                return done(null, false);
            }
            return done(null, user);
        }).catch(function(err){
            console.log('Error in finding the user ==> Passport');
            return done(err);
        })
    }
));

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
})

//deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id).then(function(user){
        return done(null, user);
    }).catch(function(err){
        return done(err);
    });
});

//checking if the user is authenticated
//creating a new function
passport.checkAuthentication = function(req, res, next){
    //if the user is signed in pass the request
    if(req.isAuthenticated()){
        return next();
    }

    //if the user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        res.locals.user = req.user; //req.user is handled by the passport
    }
    next();
}

module.exports = passport;