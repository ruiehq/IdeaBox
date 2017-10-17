const express = require('express');
const app = express();
const mongoose = require('mongoose');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }))


app.get('/', (req, res) => {
   res.send('Running');
})

app.listen(5000, () => {
   console.log(`Running at port: 5000`);
})
