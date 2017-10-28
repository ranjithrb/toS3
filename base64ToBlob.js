
/**
 * @Usage
 * let img = img.replace(/^data:image\/(png|jpg);base64,/, "");
 * base64ToBlob(img, 'image/png');
 */

base64ToBlob(_base64, _mime) {

    let _mime = _mime || '',
        _sliceSize = 1024,
        _byteChars = window.atob(_base64),
        _byteArrays = [];

    for (let _offset = 0, _len = _byteChars.length; _offset < _len; _offset += _sliceSize) {
        let _slice = _byteChars.slice(_offset, _offset + _sliceSize);

        let _byteNumbers = new Array(_slice.length);
        for (let _i = 0; _i < _slice.length; _i++) {
            _byteNumbers[_i] = _slice.charCodeAt(_i);
        }

        let _byteArray = new Uint8Array(_byteNumbers);

        _byteArrays.push(_byteArray);
    }

    return new Blob(_byteArrays, { type: _mime });
}