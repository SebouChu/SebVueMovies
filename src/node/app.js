require('dotenv').config();

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

if (process.env.NODE_ENV !== "production") {
    var open = require('opn');
}

var port = process.env.PORT || 8080;

global.DB_CLIENT = null;
global.DB_NAME = process.env.MONGODB_DBNAME;
MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, function (err, client) {
    if (err) throw err;

    console.log("Successfully connected to MongoDB. Let's begin.");

    global.DB_CLIENT = client;
});

var app = express();

app.use(express.static(path.resolve('src/static')));
app.use(express.static(path.resolve('src/dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.listen(port);

console.log(`App listening on port ${port}...`);

var apiRoutes = require('./routes.js');
app.use('/api', apiRoutes);

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:' + port);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    next();
})

app.get('/', function (req, res, next) {
    res.sendFile(path.resolve('src/dist/index.html'));
});

if (process.env.NODE_ENV !== "production") {
    open(`http://localhost:${port}`).catch(() => {
      log.warn(`Failed to open browser automatically.`);
    });
}