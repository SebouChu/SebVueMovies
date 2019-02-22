var express = require('express');
var multer = require('multer');
var axios = require('axios');
var crypto = require('crypto');
var path = require('path');
require('dotenv').config();

var mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;

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

// Get all movies with ratings
apiRoutes.route('/movies').get(function (req, res, next) {
    var dbo = global.DB_CLIENT.db(global.DB_NAME);

    dbo.collection('movies').aggregate([
        {
            $lookup: {
                from: 'ratings',
                localField: '_id',
                foreignField: 'movie_id',
                as: 'rawRatings'
            }
        },
        {
            $addFields: {
                ratings: {
                    $map: {
                        input: '$rawRatings',
                        as: 'rawRating',
                        in: '$$rawRating.rating'
                    }
                }
            }
        },
        {
            $project: { rawRatings: 0 }
        }
    ]).toArray(function (err, movies) {
        if (err) throw err;

        res.json(movies);
    });
});

// Create movie
apiRoutes.route('/movies').post(upload.single('posterFile'), function (req, res) {
    var dbo = global.DB_CLIENT.db(global.DB_NAME);

    var newMovie = JSON.parse(req.body.movie);
    newMovie.year = parseInt(newMovie.year);
    if (req.file !== undefined) {
        newMovie.poster = `uploads/${req.file.filename}`;
    }

    dbo.collection('movies').insertOne(newMovie, function (err, insertRes) {
        if (err) {
            throw err;
        }

        var returnedMovie = insertRes.ops[0];
        returnedMovie.ratings = []; // New record has no ratings

        res.json(returnedMovie);
    });
});

// Get movie with id
apiRoutes.route('/movies/:id').get(function (req, res, next) {
    var dbo = global.DB_CLIENT.db(global.DB_NAME);

    dbo.collection('movies').aggregate([
        {
          $match: { _id: ObjectID(req.params.id) }
        },
        {
          $lookup: {
              from: 'ratings',
              localField: '_id',
              foreignField: 'movie_id',
              as: 'rawRatings'
          }
        },
        {
          $addFields: {
              ratings: {
                  $map: {
                      input: '$rawRatings',
                      as: 'rawRating',
                      in: '$$rawRating.rating'
                  }
              }
          }
        },
        {
          $project: { rawRatings: 0 }
        },
    ]).next(function (err, movie) {
        if (err) throw err;

        if (movie === null) {
            res.status(404).send({ error: 'Movie not found.' });
        } else {
            res.json(movie);
        }
    });
});

// Update movie with id
apiRoutes.route('/movies/:id').post(upload.single('posterFile'), function (req, res, next) {
    var dbo = global.DB_CLIENT.db(global.DB_NAME);

    dbo.collection('movies').findOne({ _id: ObjectID(req.params.id) }, function (err, movie) {
        if (err) throw err;

        if (movie === null) {
            res.status(404).send({ error: 'Movie not found.' });
        } else {
            var updatedMovie = JSON.parse(req.body.movie);

            delete updatedMovie._id;
            delete updatedMovie.ratings;
            updatedMovie.year = parseInt(updatedMovie.year);
            if (req.file !== undefined) {
                updatedMovie.poster = `uploads/${req.file.filename}`;
            }

            dbo.collection('movies').updateOne({ _id: ObjectID(req.params.id) }, { $set: updatedMovie }, function (err, updateRes) {
                if (err) throw err;

                dbo.collection('movies').aggregate([
                    { $match: { _id: ObjectID(req.params.id) } },
                    {
                      $lookup: {
                          from: 'ratings',
                          localField: '_id',
                          foreignField: 'movie_id',
                          as: 'rawRatings'
                      }
                    },
                    {
                      $addFields: {
                          ratings: {
                              $map: {
                                  input: '$rawRatings',
                                  as: 'rawRating',
                                  in: '$$rawRating.rating'
                              }
                          }
                      }
                    },
                    { $project: { rawRatings: 0 } },
                ]).next(function (err, movie) {
                    if (err) throw err;

                    res.json(movie);
                });
            });
        }
    });
});

// Delete movie with id
apiRoutes.route('/movies/:id/delete').get(function (req, res, next) {
    var dbo = global.DB_CLIENT.db(global.DB_NAME);

    dbo.collection('movies').deleteOne({ _id: ObjectID(req.params.id) }, function (err, deleteRes) {
        if (err) throw err;

        if (deleteRes.deletedCount !== 1) {
            res.status(404).send({ error: 'Movie not found.' });
        } else {
            res.status(204).send(null);
        }
    });
});

// Rate movie with id
apiRoutes.route('/movies/:id/rate').post(function (req, res, next) {
    var dbo = global.DB_CLIENT.db(global.DB_NAME);

    dbo.collection('movies').findOne({ _id: ObjectID(req.params.id) }, function (err, movie) {
        if (err) throw err;

        if (movie === null) {
            res.status(404).send({ error: 'Movie not found.' });
        } else {
            dbo.collection('ratings').insertOne({ movie_id: movie._id, rating: req.body.rating }, function (err, insertRes) {
                if (err) throw err;

                res.status(204).send(null);
            });
        }
    });
});

// Get poster from OMDb
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