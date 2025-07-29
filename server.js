// ===== Library =====
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const express = require('express');
const methodOverride = require('method-override');
const session = require('express-session');
const morgan = require('morgan');
const MongoStore = require("connect-mongo");

// ===== middleware =====
const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');


// ===== Script =====
dotenv.config();
const port = process.env.PORT ? process.env.PORT : '3000';

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'));
// app.use(morgan('dev'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
  })
);

// Routes
app.get('/', (req, res) => {
  res.render('index.ejs', { user: req.session.user, });
});

// middleware
app.use(passUserToView);
app.use('/auth', authController);
app.use(isSignedIn);

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});