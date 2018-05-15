var multer = require('multer');

// File upload using multer

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './src/assets/uploads/' + req.body.uploadpath + '/');
    },
    filename: function(req, file, cb) {
        var datetimestamp = Date.now();
        var ext = file.originalname.split('.').pop();
        cb(null, datetimestamp + '.' + ext);
    }
});

let upload = multer({ storage: storage });

module.exports = upload;