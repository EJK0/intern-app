// For S3

const express = require('express');

const checkAuth = require('../middleware/check-auth');
const fileOps = require('../middleware/file');

const bucketController = require('../controllers/bucket');

const router = express.Router();

router.get('/sign-s3-upload', checkAuth, fileOps.storeDocument, bucketController.getSignedUrlForUpload);
router.get('/sign-s3-download', checkAuth, bucketController.getSignedUrlForDownload);

module.exports = router;
