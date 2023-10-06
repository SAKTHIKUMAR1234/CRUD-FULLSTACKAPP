const fs=require('fs')


const defaultPath='uploads/'
const imageRemover = (url) =>{
    try {
        fs.unlinkSync(defaultPath+url);
        return true;
    } catch (error) {
        return false;
    }
}

module.exports=imageRemover