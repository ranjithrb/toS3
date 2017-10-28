
let AWS = require('aws-sdk'),
    _s3Config = { accessKeyId: process.env.ACCESS_KEY, secretAccessKey: process.env.SECRET_KEY, region: process.env.REGION };

AWS.config.update(_s3Config);

function getSignedKey(req) {

    return new Promise( (resolve, reject) => {

        const _s3 = new AWS.S3(),
            _fileName = req.query['fileName'],
            _fileType = req.query['fileType'],
            _bucket = ''; // add accordingly....

        const _s3Params = {
            Bucket: _bucket,
            Key: _fileName,
            Expires: 3600,
            ContentType: _fileType,
            ACL: 'public-read'
        };

        _s3.getSignedUrl('putObject', _s3Params, (err, data) => {

            if (err) reject(err);

            const _returnData = {
                signedUrl: data,
                url: `https://s3.${_s3Config.region}.amazonaws.com/${_bucket}/${_fileName}`
            };

            resolve(_returnData);
        });
    });
}

function getTempUrl(req, res) {

    getSignedKey(req)
        .then(function (output) {
            res.json({
              status: true,
              data: output,
              message: `Successfully creeated S3 temporary url for direct upload.`
            });
        })
        .catch(function (err) {
            res.json({
              status: false,
              data: err,
              message: `Something went wrong!.`
            });
        });
}
