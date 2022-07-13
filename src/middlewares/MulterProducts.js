const path = require('path');
const multer = require('multer');

const productsStorage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,path.join(__dirname,'../../public/img/plantas'));
    },
    filename: (req,file,cb) => {
        cb(null,'planta-' + (req.body.name).replace(/\s+/g, '_') + '-' + Date.now() + path.extname(file.originalname));
    }
});

const uploadProduct = multer({storage:productsStorage});

module.exports = uploadProduct;