const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')


dotenv.config()


const getToken = (username) => {
    const token = jwt.sign({ user: username }, process.env.SECRET_KEY);
    return token;
}

const getTokenURL = (username) => {
    const token = jwt.sign({ user: username }, process.env.SECRET_KEY, { expiresIn: '2h' })

    return token;
}

const verifyToken = (token) => {
    const flag = jwt.verify(token, process.env.SECRET_KEY);
    return flag;
}


module.exports = { getToken, verifyToken, getTokenURL };