const multer = require('multer');
const path = require('path')
const fs= require('fs')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = 'public/uploads';
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    }
    ,
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
})
const upload = multer({
    storage: storage
});

module.exports = upload
