const aws = require('aws-sdk');

// S3
const S3_BUCKET = process.env.S3_BUCKET;
aws.config.region = 'us-east-1';
aws.config.accessKeyId = process.env.AWS_ACCESS_KEY_ID;
aws.config.secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
aws.config.signatureVersion = 'v4';

module.exports.getSignedUrlForUpload = (req, res) => {
  try {
    const s3 = new aws.S3();
    const fileName = req.query['fileName'];
    const fileType = req.query['fileType'];
    const s3Params = {
      Bucket: S3_BUCKET,
      Key: fileName,
      Expires: 60,
      ContentType: fileType,
    };

    s3.getSignedUrl('putObject', s3Params, (err, data) => {
      if (err) {
        console.log(err);
      }
      const returnData = {
        signedRequest: data,
        url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`,
      };
      res.write(JSON.stringify(returnData));
      res.end();
    });

    // Call S3 to list the buckets
    s3.listBuckets(function(err, data) {
      if (err) {
        console.log('Error', err);
      } else {
        console.log('Success', data.Buckets);
      }
    });
  } catch (err) {
    console.log('Problems accessing the S3 bucket', err);
  }
};

module.exports.getSignedUrlForDownload = (req, res) => {
  try {
    const s3 = new aws.S3();
    const filePath = req.query['filePath'];
    const s3Params = {
      Bucket: S3_BUCKET,
      Key: filePath,
      Expires: 60,
    };

    s3.getSignedUrl('getObject', s3Params, (err, data) => {
      if (err) {
        console.log(err);
      }
      const returnData = {
        signedRequest: data,
        url: `https://${S3_BUCKET}.s3.amazonaws.com/${filePath}`,
      };
      res.write(JSON.stringify(returnData));
      res.end();
    });

    // Call S3 to list the buckets
    s3.listBuckets(function(err, data) {
      if (err) {
        console.log('Error', err);
      } else {
        console.log('Success', data.Buckets);
      }
    });
  } catch (err) {
    console.log('Problems accessing the S3 bucket', err);
  }
};
