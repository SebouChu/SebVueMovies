var express = require('express');
var apiRoutes = express.Router();

apiRoutes.route('/movies').get(function (req, res, next) {
    res.json(MOVIES);
});

apiRoutes.route('/movies').post(function (req, res) {
    var newMovie = {
        id: MOVIES[MOVIES.length - 1].id + 1,
        title: `${req.body.title}`,
        year: parseInt(req.body.year),
        language: `${req.body.language}`,
        director: {
            name: `${req.body.director.name}`,
            nationality: `${req.body.director.nationality}`,
            birthdate: `${req.body.director.birthdate}`
        },
        genre: `${req.body.genre}`,
        ratings: []
    };

    MOVIES.push(newMovie)

    res.json({ id: newMovie.id });
});

apiRoutes.route('/movies/:id').get(function (req, res, next) {
    var movie = MOVIES.find(movie => movie.id == req.params.id)

    if (movie === null) {
        res.status(404).send({ error: 'Movie not found.' });
    } else {
        res.json(movie);
    }
});

apiRoutes.route('/movies/:id').post(function (req, res, next) {
    var movie = MOVIES.find(movie => movie.id == req.params.id)

    if (movie === null) {
        res.status(404).send({ error: 'Movie not found.' });
    } else {
        movie.title = `${req.body.title}`;
        movie.year = parseInt(req.body.year);
        movie.language = `${req.body.language}`;
        movie.director.name = `${req.body.director.name}`;
        movie.director.nationality = `${req.body.director.nationality}`;
        movie.director.birthdate = `${req.body.director.birthdate}`;
        movie.genre = `${req.body.genre}`;

        res.status(204).send(null);
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

module.exports = apiRoutes;