getSignedUrl(_file) {

    const _fileName = encodeURIComponent('file-name.pdf'),
        _fileType = encodeURIComponent('application/pdf'),
        _xhr = new XMLHttpRequest();

    _xhr.open('GET', `admin/getSignedUrl?fileName=${_fileName}&fileType=${_fileType}`);
    _xhr.onreadystatechange = () => {
        if (_xhr.readyState === 4) {

            if (_xhr.status === 200) {

              const _response = JSON.parse(_xhr.responseText),
                _url = _response.data.url;

              uploadFile(_file, _response.data.signedUrl, _response.data.url);
            }
        }
    };
    _xhr.send();
}

uploadFile(file, signedRequest, url) {

    const xhr = new XMLHttpRequest();

    xhr.open('PUT', signedRequest);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {

            if (xhr.status === 200) {
              // things to do after successfully uploading.......
            }
        }
    };
    xhr.send(file);
}

// considering '_img' contains base64 converted url
const img = img.replace(/^data:image\/(png|jpg);base64,/, ""),
_data = base64ToBlob(img, 'image/png'); // refering to base64ToBlob.js

getSignedUrl(_data);
