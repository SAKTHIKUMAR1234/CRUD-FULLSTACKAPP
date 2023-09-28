const router = require('express').Router()
const CustomeError = require('../../util/customeError')
const service = require('../controller/AdminController')
const encryptor = require('../../util/encryptor')
const responce = require('../../util/responce')

router.post('/createAdmin', async (req, res, next) => {
    try {
        const data = req.body
        const password = data.password
        const hashPassword = await encryptor.getHash(password)
        data.password = hashPassword
        const result = await service.addAdmin(data);
        res.status(responce.getStatus(result)).json(responce.getMessage(result));


    } catch (error) {
        console.log(error)
        const err = new CustomeError(500);
        next(err)
    }
})


router.post('/authenticate',async (req,res,next)=>{
    try {
        const data = req.body;
        const {email,password}=data;
        const result = await service.findAdmin(data);
        res.status(responce.getStatus(result)).json(responce.getMessage(result));
    } catch (error) {
        console.log(error)
        const err = new CustomeError(500);
        next(err)
    }
})

module.exports = router 