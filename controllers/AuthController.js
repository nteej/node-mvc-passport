const User = require("../models/User");
const passport = require("passport");

const getLogin = async (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/dashboard');
    } else {
        res.render("login", {});
    }
}
const postLogin = async (req, res,next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/auth/login',
        failureFlash: true
    })(req, res, next);
}
const getRegister = async (req, res) => {
    res.render("register", {});
}
const postRegister = async (req, res) => {

}
const getLogout = async (req, res,next) => {
    req.logout(err => {
        if (err) return next(err);
        req.flash('success_msg', 'You are logged out');
        res.redirect('/auth/login');
    });
}

module.exports = {
    getLogin,
    postLogin,
    getLogout,
    getRegister,
    postRegister
}