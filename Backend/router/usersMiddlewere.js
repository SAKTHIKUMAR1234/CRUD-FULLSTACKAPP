const jwtServices = require('../util/getJWT')
const CustomeError = require('../util/customeError');
const { findUser } = require('../database/services/mainUserServices/operations');



const auth=async (req,res,next) => {
    try {
        if (req.cookies.authtoken) {
            const user=(jwtServices.verifyToken(req.cookies.authtoken)).user;
            const result=await findUser(user);
            if (result.length==1) {
                res.cookie('authtoken',req.cookies.authtoken,{ expires: new Date(Date.now() + (1000 * 60 * 60)), httpOnly: true })
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