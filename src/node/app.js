var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

const open = require('opn');

var port = 8080;

global.MOVIES = [
    {
        id: 1,
        title: "Les Animaux fantastiques : Les Crimes de Grindelwald",
        year: 2018,
        language: 'Anglais',
        director: {
            name: "David Yates",
            nationality: "Britannique",
            birthdate: "1963-11-30"
        },
        poster: 'https://via.placeholder.com/170x250',
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
        poster: 'https://via.placeholder.com/170x250',
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
        poster: 'https://via.placeholder.com/170x250',
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

open(`http://localhost:${port}`).catch(() => {
  log.warn(`Failed to open browser automatically.`);
});