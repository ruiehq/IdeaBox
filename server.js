const express = require('express');
const app = express();


app.get('/', (req, res) => {
   res.send('Running');
})

app.listen(5000, () => {
   console.log(`Running at port: 5000`);
})
