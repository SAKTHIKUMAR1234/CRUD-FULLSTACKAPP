const express = require('express')
const router = express.Router();
const service = require('../database/services/mainUserServices/operations')
const responce = require('../util/responce')
const encryptor = require('../util/encryptor');
const jwtServices = require('../util/getJWT');
const CustomeError = require('../util/customeError');



router.post('/createUser', async (req, res) => {
    try {
        const body = req.body;
        const pwd = await encryptor.getHash(req.body.password1);
        const details = [body.fname, body.lname, body.mobile, body.email, pwd];
        await service.addUser(details).then(result => {
            res.status(responce.getStatus(result)).json(responce.getMessage(result));
        });
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
            const token = jwtServices.getToken(email);
            res.cookie('authtoken', token, { expires: new Date(Date.now() + (1000 * 60 * 60)), httpOnly: true }).status(200).json({
                "message": "Valid Data"
            });
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


router.get('/logout',(req,res,next)=>{

    try {
        if(req.cookies.authtoken){
            res.cookie('authtoken',req.cookies.authtoken,{
                expires: new Date(Date.now()),
                httpOnly:true
            }).status(200).json({
                "message" : "Logout SuccessFull"
            })
        }
        else{
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

module.exports = router

