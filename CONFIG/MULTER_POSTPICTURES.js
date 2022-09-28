/* ------> IMPORT DEPENDENCIES <------ */
const multer = require('multer');
const path = require('path');

/* ---> DEFINE MULTER STORAGE <--- */
const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        return cb(null, path.join(__dirname,'..','/UTILITIES/UPLOADED_POST_PICS'))
    },
    filename:(req,file,cb)=>{
        return cb(null, Date.now()+file.originalname);
    }
})

/* ---> EXPORT MULTER STORAGE <--- */
module.exports = multer({storage:storage});
