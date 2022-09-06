import { join, extname } from 'path';
import multer, { diskStorage } from 'multer';

const usersStorage = diskStorage({
    destination: (req,file,cb) => {
        cb(null,join(__dirname,'../../public/img/users/avatar/'));
    },
    filename: (req,file,cb) => {
        cb(null,'user-'+ Date.now()+extname(file.originalname));
    }
});

const uploadUser = multer({storage:usersStorage});

export default uploadUser
