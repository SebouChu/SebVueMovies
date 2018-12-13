var express = require('express');
var apiRoutes = express.Router();

apiRoutes.route('/movies').get(function (req, res, next) {
    res.json(MOVIES);
});

apiRoutes.route('/movies').post(function (req, res) {
    res.json({ action: 'new_movie' });
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