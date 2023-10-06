const router = require('express').Router()
const CustomeError = require('../../util/customeError')
const service = require('../controller/AdminController')
const encryptor = require('../../util/encryptor')
const responce = require('../../util/responce')
const getJwt = require('../../util/getJWT')
require('dotenv').config()
const socketClient = require('socket.io-client')
const MailSocketService = socketClient(process.env.MAIL_SERVICE_URL)



const vericationResults = [`Successfully Verified 
Login To Continue : <a href="http://localhost:5173">User Login</a>`, `The Link has been invalid or Get Expired
    Please Login to Resend the Valiation Code <a href="http://localhost:5173">User Login</a>`];

router.post('/createAdmin', async (req, res, next) => {
    try {
        const data = req.body
        const password = data.password
        const hashPassword = await encryptor.getHash(password)
        data.password = hashPassword
        const adminVerification = {
            email: data.email,
            token: getJwt.getTokenURL(data.email)
        }
        MailSocketService.emit('SendMail', adminVerification)
        const result = await service.addAdmin(data, adminVerification)

        res.status(responce.getStatus(result)).json(responce.getMessage(result))


    } catch (error) {
        console.log(error)
        const err = new CustomeError(500);
        next(err)
    }
})


router.post('/authenticate', async (req, res, next) => {
    try {
        const data = req.body;
        const { email, password } = data;
        const result = await service.findAdmin(data);
        if (!result) {
            const err = new CustomeError(404)
            next(err)
        }
        else {
            const valid = await encryptor.compare(password, result.password)
            result.password = "************"
            result.verifyUrl = "**************"
            const token = getJwt.getToken(result);
            if (valid) {
                if (result.status === true) {
                    res.cookie('authtoken', token, { expires: new Date(Date.now() + (1000 * 60 * 60)), httpOnly: true }).status(200).json({
                        "message": "Authorized"
                    })
                }
                else {
                    const err = new CustomeError(305)
                    next(err)
                }
            }
            else {
                const err = new CustomeError(401)
                next(err)
            }

        }

    } catch (error) {
        //console.log(error)
        const err = new CustomeError(500);
        next(err)
    }
})


router.get('/logout', (req, res, next) => {

    try {
        if (req.cookies.authtoken) {
            const data = getJwt.verifyToken(req.cookies.authtoken)
            if (data instanceof Error) {
                const err = new CustomeError(401);
                next(err);
            }
            res.cookie('authtoken', req.cookies.authtoken, {
                expires: new Date(Date.now() + (1000 * 60 * 60)),
                httpOnly: true
            }).status(200).json({
                "message": "Logout SuccessFull"
            })
        }
        else {
            const err = new CustomeError(401);
            next(err);
        }
    } catch (error) {
        console.log(error);
        const err = new CustomeError(500);
        next(err);
    }

})


router.get('/find/:email', async (req, res, next) => {

    try {
        const data = {
            "email": req.params.email
        }
        await service.findIsExist(data).then(result => {
            res.status(responce.getStatus(result)).json(responce.getMessage(result));
        });
    } catch (error) {
        console.log(error);
        const err = new CustomeError(500);
        next(err);
    }
})


router.get('/verify/:token', async (req, res, next) => {
    const token = req.params.token;
    try {
        const data = getJwt.verifyToken(token);
        if (data instanceof Error) {
            const err = new CustomeError(401);
            next(err);
        }
        else {
            const userData = {
                email: data.user
            }
            const result = await service.findAdmin(userData);
            if (result.verifyUrl === token) {
                try {
                    const updateResult = await service.updateStatus(result)
                    if (updateResult instanceof Error) {
                        throw new Error(updateResult)
                    }
                    res.send(vericationResults[0])
                } catch (error) {
                    console.log(error)
                    const err = new CustomeError(500);
                    next(err);
                }
            }
            else {
                res.send(vericationResults[1]);
            }
        }

    } catch (error) {
        res.send(vericationResults[1]);
    }
})


router.get('/regenerateurl/:email', async (req, res, next) => {
    try {
        const data = {
            email: req.params.email,
            token: getJwt.getTokenURL(req.params.email)
        }
        MailSocketService.emit('SendMail', data)
        await service.regenerateUrlUpdate(data).then(dbresponse => {
            res.status(responce.getStatus(dbresponse)).json(responce.getMessage(dbresponse));
        });
    } catch (error) {
        console.log(error);
        const err = new CustomeError(500);
        next(err);
    }
})


module.exports = router 