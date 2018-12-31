var express = require('express');
var multer = require('multer');
var axios = require('axios');
var crypto = require('crypto');
var path = require('path');
require('dotenv').config();

var apiRoutes = express.Router();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/static/uploads/')
    },
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            cb(null, raw.toString('hex') + path.extname(file.originalname));
        });
    }
});

var upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        var filetypes = /jpeg|jpg|png/;
        var mimetype = filetypes.test(file.mimetype);
        var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }

        cb("Error: File upload only supports the following filetypes - " + filetypes);
    }
});

apiRoutes.route('/movies').get(function (req, res, next) {
    res.json(MOVIES);
});

apiRoutes.route('/movies').post(upload.single('posterFile'), function (req, res) {
    var newMovie = JSON.parse(req.body.movie);
    newMovie.id = MOVIES[MOVIES.length - 1].id + 1;
    newMovie.year = parseInt(newMovie.year);
    if (req.file !== undefined) {
        newMovie.poster = `uploads/${req.file.filename}`;
    }

    MOVIES.push(newMovie);
    res.json(newMovie);
});

apiRoutes.route('/movies/:id').get(function (req, res, next) {
    var movie = MOVIES.find(movie => movie.id == req.params.id)

    if (movie === null) {
        res.status(404).send({ error: 'Movie not found.' });
    } else {
        res.json(movie);
    }
});

apiRoutes.route('/movies/:id').post(upload.single('posterFile'), function (req, res, next) {
    var movie = MOVIES.find(movie => movie.id == req.params.id)

    if (movie === null) {
        res.status(404).send({ error: 'Movie not found.' });
    } else {
        var updatedMovie = JSON.parse(req.body.movie);

        movie.title = `${updatedMovie.title}`;
        movie.year = parseInt(updatedMovie.year);
        movie.language = `${updatedMovie.language}`;
        movie.director.name = `${updatedMovie.director.name}`;
        movie.director.nationality = `${updatedMovie.director.nationality}`;
        movie.director.birthdate = `${updatedMovie.director.birthdate}`;
        movie.genre = `${updatedMovie.genre}`;
        movie.poster = updatedMovie.poster;

        if (req.file !== undefined) {
            movie.poster = `uploads/${req.file.filename}`;
        }

        res.json(movie);
    }
});

apiRoutes.route('/movies/:id/delete').get(function (req, res, next) {
    var movieIndex = MOVIES.findIndex(movie => movie.id == req.params.id)

    if (movieIndex === -1) {
        res.status(404).send({ error: 'Movie not found.' });
    } else {
        MOVIES.splice(movieIndex, 1);

        res.status(204).send(null);
    }
});

apiRoutes.route('/movies/:id/rate').post(function (req, res, next) {
    var movie = MOVIES.find(movie => movie.id == req.params.id)

    if (movie === null) {
        res.status(404).send({ error: 'Movie not found.' });
    } else {
        movie.ratings.push(req.body.rating);

        res.status(204).send(null);
    }
});

apiRoutes.route('/omdb').get(function (req, res, next) {
    var movieTitle = req.query.title;
    var paramTitle = movieTitle.replace(' ', '+');
    axios.get(`https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&t=${paramTitle}`)
        .then(response => {
            if (response.data['Poster'] !== undefined) {
                res.status(200).send({ poster_url: response.data['Poster'] });
            } else {
                res.status(404).send({ error: 'Poster not found.' })
            }
        }
    );
});

module.exports = apiRoutes;