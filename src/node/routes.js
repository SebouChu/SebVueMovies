var express = require('express');
var apiRoutes = express.Router();

apiRoutes.route('/all').get(function (req, res, next) {
    res.json({ action: 'all' });
});

apiRoutes.route('/add').post(function (req, res) {
    res.json({ action: 'add' });
});

apiRoutes.route('/delete/:id').get(function (req, res, next) {
    res.json({ action: 'delete' });
});

apiRoutes.route('/update/:id').post(function (req, res, next) {
    res.json({ action: 'update' });
});

module.exports = apiRoutes;