const bcrypt = require('bcrypt')

const getHash = async (pwd) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash =await bcrypt.hash(pwd,salt);
        return hash;
    } catch (error) {
        console.log(error);
        return error;
    }
}

const compare = async (pwd,hashPassword)=>{
    try {
        const flag=await bcrypt.compare(pwd,hashPassword);
        return flag;
    } catch (error) {
        console.log(error);
        return error;
    }
}

module.exports = {
    getHash,compare
}
