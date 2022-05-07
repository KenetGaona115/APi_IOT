const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express();
app.listen(process.env.PORT || 3000, () => console.log('Listening')); 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) 
// parse application/json
app.use(bodyParser.json())

app.use(cors())
app.use('/api',require('./routes/api.routes'))
//app.use(express.static(path.join(__dirname, 'public/frontend')))


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
 
module.exports = app;