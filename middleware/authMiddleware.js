module.exports = {
    ensureAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }else{
            res.redirect('/auth/login');
        }
        //res.status(401).json({ message: "Unauthorized. Please log in." });
    }
};