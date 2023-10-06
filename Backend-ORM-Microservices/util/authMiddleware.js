
const getJWT = require('../util/getJWT')
const CustomeError = require('./customeError')

const auth = async (req, res, next) => {
    try {
        if (req.cookies.authtoken) {
            try {
                const user = (getJWT.verifyToken(req.cookies.authtoken)).user
            } catch (error) {
                const err = new CustomeError(401)
                next(err);
                return ;
            }
            if (true) {
                res.cookie('authtoken', req.cookies.authtoken, { expires: new Date(Date.now() + (1000 * 60 * 60)), httpOnly: true })
                next();
            }
            else {
                const err = new CustomeError(401)
                next(err);
            }
        }
        else {
            const err = new CustomeError(401)
            next(err);
        }
    } catch (error) {
        console.log(error);
        const err = new CustomeError(500)
        next(err);
    }
}

module.exports = auth