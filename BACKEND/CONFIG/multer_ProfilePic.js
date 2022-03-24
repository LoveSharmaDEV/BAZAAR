const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        return cb(null, path.join(__dirname,'..','/UTILITIES/UPLOADED_PROFILE_PICS'))
    },
    filename:(req,file,cb)=>{
        return cb(null, Date.now()+file.originalname);
    }
})

module.exports = multer({storage:storage});