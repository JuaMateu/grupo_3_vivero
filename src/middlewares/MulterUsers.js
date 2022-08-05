const path = require('path');
const multer = require('multer');

const usersStorage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,path.join(__dirname,'../../public/img/users/avatar/'));
    },
    filename: (req,file,cb) => {
        cb(null,'user-'+ Date.now()+path.extname(file.originalname));
    }
});

const uploadUser = multer({storage:usersStorage});

module.exports = uploadUser
