const jwtServices = require('../util/getJWT')
const CustomeError = require('../util/customeError');


const auth=(req,res,next) => {
    try {
        if (req.cookies.authtoken) {
            if (jwtServices.verifyToken(req.cookies.authtoken)) {
                next();
            }
            else{
                const err=new CustomeError(401);
                next(err);
            }
        }
        else {
            const err=new CustomeError(401);
            next(err);
        }
    } catch (error) {
        console.log(error);
        const err=new CustomeError(500);
        next(err);
    }
}


module.exports=auth