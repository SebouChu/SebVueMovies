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

global.MOVIES = [
    {
        id: 1,
        title: "Fantastic Beasts: The Crimes of Grindelwald",
        year: 2018,
        language: 'Anglais',
        director: {
            name: "David Yates",
            nationality: "Britannique",
            birthdate: "1963-11-30"
        },
        poster: null,
        genre: 'Fantastique',
        ratings: [4, 3, 3]
    },
    {
        id: 2,
        title: "Titanic",
        year: 1997,
        language: 'Anglais',
        director: {
            name: "James Cameron",
            nationality: "Canadien",
            birthdate: "1954-08-16"
        },
        poster: null,
        genre: 'Historique',
        ratings: [5, 4]
    },
    {
        id: 3,
        title: "Interstellar",
        year: 2014,
        language: 'Anglais',
        director: {
            name: "Christopher Nolan",
            nationality: "Britannique",
            birthdate: "1970-07-30"
        },
        poster: null,
        genre: 'Science-fiction',
        ratings: [5, 5, 5, 5]
    }
];

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