const express = require('express')
const router = express.Router();
const service = require('../database/services/mainUserServices/operations')
const responce = require('../util/responce')
const encryptor = require('../util/encryptor');
const jwtServices = require('../util/getJWT');
const CustomeError = require('../util/customeError');
const emailSender = require('../util/verificationEmailSender');
const validationService = require('../database/services/mainUserServices/views/mainUserViews');



const vericationResults = [`Successfully Verified 
Login To Continue : <a href="http://localhost:5173">User Login</a>`, `The Link has been invalid or Get Expired
    Please Login to Resend the Valiation Code <a href="http://localhost:5173">User Login</a>`];


router.post('/createUser', async (req, res) => {
    try {
        const body = req.body;
        const pwd = await encryptor.getHash(req.body.password1);
        const token = jwtServices.getTokenURL(req.body.email);
        const result = await emailSender(req.body.email, token);
        if (result) {
            const details = [body.fname, body.lname, body.mobile, body.email, pwd, body.email, token];
            await service.addUser(details).then(result => {
                res.status(responce.getStatus(result)).json(responce.getMessage(result));
            });
        }
        else {
            const err = new CustomeError(500);
            next(err);
        }
    } catch (error) {
        console.log(error);
        const err = new CustomeError(500);
        next(err);
    }
})



router.post('/authenticateUser', async (req, res, next) => {
    try {
        const email = req.body.email;
        const pwd = req.body.pwd;
        const hashPassword = await service.findUser(email).then(data => {
            return data[0].password;
        })
        const result = await encryptor.compare(pwd, hashPassword);

        if (result) {

            const status = await validationService.getMainUserStatus(req.body.email)

            if (status.status) {
                const token = jwtServices.getToken(email);
                res.cookie('authtoken', token, { expires: new Date(Date.now() + (1000 * 60 * 60)), httpOnly: true }).status(200).json({
                    "message": "Valid Data"
                });
            }

            else {
                const err = new CustomeError(305);
                next(err);
            }

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


router.get('/logout', (req, res, next) => {

    try {
        if (req.cookies.authtoken) {
            res.cookie('authtoken', req.cookies.authtoken, {
                expires: new Date(Date.now()),
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


router.get('/find/:email', async (req, res) => {

    try {
        const data = req.params.email;
        await service.findUser(data).then(result => {
            res.status(responce.getStatus(result)).json(responce.getMessage(result));
        });
    } catch (error) {
        console.log(error);
        const err = new CustomeError(500);
        next(err);
    }
})

router.get('/verify/:token', async (req, res) => {
    const token = req.params.token;
    try {
        const data = jwtServices.verifyToken(token);
        const result = await validationService.getMainUserStatus(data.user)
        if (result.verifyurl === token) {
            try {
                await validationService.updateMainUserStatus(data.user);
            } catch (error) {
                console.log(error);
                const err = new CustomeError(500);
                next(err);
            }
            res.send(vericationResults[0]);
        }
        else {
            res.send(vericationResults[1]);
        }

    } catch (error) {
        res.send(vericationResults[1]);
    }
})

router.get('/regenerateurl/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const token = jwtServices.getTokenURL(email);
        const result = await emailSender(email, token);
        if (result) {
            const data = [token, email];
            await validationService.updateMainUserVerification(data).then(dbresponse => {
                res.status(responce.getStatus(dbresponse)).json(responce.getMessage(dbresponse));
            });

        }
        else {
            console.log(result);
            const err = new CustomeError(500);
            next(err);
        }
    } catch (error) {
        console.log(error);
        const err = new CustomeError(500);
        next(err);
    }
})

module.exports = router

