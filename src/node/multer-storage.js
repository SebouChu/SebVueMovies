require('dotenv').config();

var crypto = require('crypto');
var path = require('path');
var aws = require('aws-sdk');
var multer = require('multer');
var multerS3 = require('multer-s3');
var multerStorage = null;

if (process.env.NODE_ENV === "production") {
    aws.config.region = process.env.AWS_REGION;
    aws.config.accessKeyId = process.env.AWS_ACCESS_KEY;
    aws.config.secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
    var s3 = new aws.S3();

    multerStorage = multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            crypto.pseudoRandomBytes(16, function (err, raw) {
                cb(null, raw.toString('hex'));
            });
        }
    });
} else {
    multerStorage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './src/static/uploads/')
        },
        filename: function (req, file, cb) {
            crypto.pseudoRandomBytes(16, function (err, raw) {
                cb(null, raw.toString('hex') + path.extname(file.originalname));
            });
        }
    });
}

module.exports = multerStorage;