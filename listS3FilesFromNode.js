const AWS = require('aws-sdk'),
    _s3Config = { accessKeyId: process.env.ACCESS_KEY, secretAccessKey: process.env.SECRET_KEY, region: process.env.REGION };

AWS.config.update(_s3Config);

function listFiles(req, Const, callback) {

    const _s3 = new AWS.S3(),
      _bucketName = '',
      _params = {
        Bucket: _bucketName,
        Delimiter: '/',
        Prefix: 'folder/sub_' // match all files and folder starting with  this prefix (here: 'folder/sub_') only
    };

    /**
     * function to list all objects from S3 according to given '_params'.
     * @return {JS object}
     */
    _s3.listObjects(_params, function (_error, _list) {

        if (_error) return {
          status: false,
          message: `Problem encountered.`
        }

        if (_list !== null && Array.isArray(_list.Contents) && _list.Contents.length > 0) {

          // _logic goes here............

            return {
              status: true,
              message: `Success.`
            };
        }

        return {
          status: true,
          message: `No list found.`
        };
    });
}
