const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors');

let app = express();
app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(cors());
app.use(express.static('./app/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

module.exports = app;
