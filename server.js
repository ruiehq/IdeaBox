const express = require('express');
const app = express();
const mongoose = require('mongoose');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017', { useMongoClient: true })
   .then(() => console.log('MongoDB Connected'))
   .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.engine('handlebars', hbs({ defaultLayout: 'default' }));
app.set('view engine', 'handlebars');

// Index Page
app.get('/', (req, res) => {
   res.render('home', { title: 'Ruie to' });
});

// About Page
app.get('/about', (req, res) => {
   res.render('about');
});

app.listen(5000, () => {
   console.log(`Running at port: 5000`);
});
