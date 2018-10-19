const jwt = require('jsonwebtoken'),
    crypto = require('crypto'),
    User = require('../models/userModel'),
    Token = require('../models/verificationTokenModel'),
    config = require('../config/index');

function generateToken(user) {
    return jwt.sign(user, config.jwtSecret, {
        expiresIn: 10080 // in seconds
    });
}
function setUserInfo(request) {
    return {
        _id: request._id,
        firstName: request.profile.firstName,
        lastName: request.profile.lastName,
        email: request.email,
        verifiedByEmail: request.verifiedByEmail,
        role: request.role,
        agency: request.agency
    };
}
//========================================
// Login Route
//========================================
exports.login = function(req, res, next) {

    let userInfo = setUserInfo(req.user);

    if(userInfo.verifiedByEmail){
        res.status(200).json({
            token: 'JWT ' + generateToken(userInfo),
            user: userInfo
        });
    } else {
        res.status(422).send({ error: 'You must first verify your email address.'});
    }
};


//========================================
// Registration Route
//========================================
exports.register = function(req, res, next) {
    console.log(req.body);
    // Check for registration errors
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;
    const role = req.body.role;
    let agency = "";
    //Only agents and editors will have an agency field. Don't want to have any object.agency is undefined errors.
    if(req.body.agency){
        agency = req.body.agency;
    }

    // Return error if no email provided
    if (!email) {
        return res.status(422).send({ error: 'You must enter an email address.'});
    }

    // Return error if full name not provided
    if (!firstName || !lastName) {
        return res.status(422).send({ error: 'You must enter your full name.'});
    }

    // Return error if no password provided
    if (!password) {
        return res.status(422).send({ error: 'You must enter a password.' });
    }
    if(role === "Agent" && !agency){
        return res.status(422).send({ error: 'You must provide an agency name'});
    }

    User.findOne({ email: email }, function(err, existingUser) {
        if (err) { return next(err); }

        // If user is not unique, return error
        if (existingUser) {
            return res.status(422).send({ error: 'That email address is already in use.' });
        }

        // If email is unique and password was provided, create account
        let user = new User({
            email: email,
            password: password,
            profile: { firstName: firstName, lastName: lastName },
            verifiedByEmail: false,
            agency: agency,
            role: role
        });

        user.save(function(err, user) {
            if (err) { return next(err); }
            var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
            token.save(function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }

                // Respond with JWT if user was created
                let userInfo = setUserInfo(user);

                res.status(201).json({
                    token: 'JWT ' + generateToken(userInfo),
                    user: userInfo
                });
            });
        });
    });
};

//========================================
// Authorization Middleware
//========================================

// Role authorization check
exports.roleAuthorization = function(role) {
    return function(req, res, next) {
        const user = req.user;

        User.findById(user._id, function(err, foundUser) {
            if (err) {
                res.status(422).json({ error: 'No user was found.' });
                return next(err);
            }

            // If user is found, check role.
            if (foundUser.role === role) {
                return next();
            }

            res.status(401).json({ error: 'You are not authorized to view this content.' });
            return next('Unauthorized');
        })
    }
}