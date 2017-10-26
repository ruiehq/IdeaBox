const express = require('express');
const hbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middlewares
app.engine('handlebars', hbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Routes
app.get('/', (req, res) => {
   res.render('index');
});

app.get('/about', (req ,res) => {
   res.render('about');
})


// Run Server
app.listen(PORT, () => {
   console.log(`App is running on PORT:${PORT}`);
})
