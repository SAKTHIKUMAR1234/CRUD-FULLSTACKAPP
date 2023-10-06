const multer = require('multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
      },
    filename: function (req, file, cb) {
        cb(null, Date.now()+".jpg");
    }
});

const uploadImg = multer({storage: storage}).single('photo');

module.exports=uploadImg