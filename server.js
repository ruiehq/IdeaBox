const express = require('express');
const hbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/ideabox', { useMongoClient: true })
   .then(() => console.log('MongoDB Connected'))
   .catch(err => console.log(err));

// Middlewares
app.engine('handlebars', hbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(session({
   secret: 'secret',
   resave: true,
   saveUninitialized: true
}))
app.use(flash());

// Global Middlewares
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();

});

// Models
const Idea = require('./models/Idea.js');

// Routes
app.get('/', (req, res) => {
   res.render('index');
});

app.get('/about', (req ,res) => {
   res.render('about');
});

app.get('/ideas', (req, res) => {
   Idea.find({})
      .sort({ date: 'desc' })
      .then(ideas => {
         res.render('ideas/index', { ideas });
      })
      .catch(err => console.log(err));
});

app.post('/ideas', (req, res) => {
   const { title, details } = req.body;
   const newUser = {
      title,
      details
   };
   new Idea(newUser)
      .save()
      .then(idea => {
         req.flash('success_msg', 'Idea added successfully');
         res.redirect('/ideas');
      });
});

app.delete('/ideas/:id', (req, res) => {
   Idea.remove({ _id: req.params.id })
      .then(() => {
         req.flash('success_msg', 'Idea Removed Successfully');
         res.redirect('/ideas');
   })
});

app.get('/ideas/add', (req, res) => {
   res.render('ideas/add');
});

// Run Server
const PORT = 3000;
app.listen(PORT, () => {
   console.log(`App is running on PORT:${PORT}`);
})
