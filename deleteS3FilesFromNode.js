
/*
  const _s3DeleteObjects = [{                              *
    Key: 'fileNameOne'
  }, {
    Key: 'fileNameTwo'
  }];

*/

/**
 * delete objects from S3 bucket.
 * @param  {Array} _s3DeleteObjects
 * @return {JS Object}
 */
function deleteObjects(_s3DeleteObjects) {

    if (_s3DeleteObjects !== null) {

        const _s3 = new AWS.S3(),
          _bucketName = '', // bucket name goes here.
          _params = {
            Bucket: _bucketName,
            Delete: {
                Objects: _s3DeleteObjects
            }
        };

        _s3.deleteObjects(_params, function (_error, _data) {
            if (_data) {
                return {
                  status: true,
                  message: `Objects deleted successfully.`
                }
            }
            return {
              status: false,
              message: `Problem encountered.`
            }
        });
    }

    return {
      status: true,
      message: `No Objects to delete.`
    }
}
