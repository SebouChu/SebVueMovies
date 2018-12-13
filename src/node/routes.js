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
    };

    MOVIES.push(newMovie)

    res.json({ id: newMovie.id });
});

apiRoutes.route('/movies/:id').get(function (req, res, next) {
    res.json({ action: 'movie' });
});

apiRoutes.route('/movies/:id').post(function (req, res, next) {
    res.json({ action: 'update_movie' });
});

apiRoutes.route('/movies/:id/delete').get(function (req, res, next) {
    res.json({ action: 'delete_movie' });
});

module.exports = apiRoutes;