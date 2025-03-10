const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const exphbs = require('express-handlebars');
var path = require('path');
const {ensureAuthenticated} = require('./middleware/authMiddleware');
require('./config/passport')(passport);
const connectDB = require("./config/db");
const authRoute = require('./routes/auth');
const dashboardRoute = require('./routes/index')
const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

// Express Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Flash messages
app.use(flash());

// Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// View Engine
app.use(express.static(path.join(__dirname, 'public')));
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');

// Routes
app.get("/", (req, res) => {
    res.render("index", { user: req.user });
  });
app.use('/dashboard',ensureAuthenticated,dashboardRoute );
app.use('/auth', authRoute);

// MongoDB Connection
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));