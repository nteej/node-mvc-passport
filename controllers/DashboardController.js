const passport = require("passport");

const getIndex = async (req, res) => {
    res.render('dashboard', { user: req.user.toObject() })
}

module.exports = {getIndex};