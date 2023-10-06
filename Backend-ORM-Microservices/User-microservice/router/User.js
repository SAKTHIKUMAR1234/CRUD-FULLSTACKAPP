const express = require('express')
const router = express.Router()
const service = require('../controller/userController')
const CustomeError = require('../../util/customeError')
const responce = require('../../util/responce')
const getJWT = require('../../util/getJWT')
const fs = require('fs');
const dateFormater = require('../../util/dataformat')
const imageRemover = require('../util/removeImage')

const uploadImg = require('../util/multer')


router.get('/getAll', async (req, res, next) => {
    try {
        const user = (getJWT.verifyToken(req.cookies.authtoken)).user;
        const data = { user };
        var result = await service.getAllUser(data)
        res.status(responce.getStatus(result)).json(responce.getMessage(dateFormater(result)));
    } catch (error) {
        console.log(error)
        const err = new CustomeError(500);
        next(err)
    }
});


router.post('/add',uploadImg,async (req, res, next) => {
    try {
        const data = req.body;
        const user = (getJWT.verifyToken(req.cookies.authtoken)).user
        data.createdByAdminId = user.id
        data.profilepicname = req.file.filename;
        await service.insertUser(data).then(result => {
            res.status(responce.getStatus(result)).json(responce.getMessage(result))
        });
    } catch (error) {
        console.log(error)
        const err = new CustomeError(500);
        next(err)
    }
})




router.post('/update', uploadImg, async (req, res, next) => {

    try {
        const data = req.body
        data.profilepicname=req.file.filename
        const flag = imageRemover(req.body.prevName)
        if (flag) {
            await service.updateUser(data).then(result => {
                res.status(responce.getStatus(result)).json(responce.getMessage(result));
            });
        }
        else {
            console.log("Unable to remove Image")
            const err = new CustomeError(500);
            next(err)
        }
    } catch (error) {
        console.log(error)
        const err = new CustomeError(500);
        next(err)
    }


})


router.get('/find/:email', async (req, res, next) => {

    try {
        const data = {email:req.params.email};
        await service.findUser(data).then(result => {
            res.status(responce.getStatus(result)).json(responce.getMessage(result));
        });
    } catch (error) {
        console.log(error)
        const err = new CustomeError(500);
        next(err)
    }
})

router.delete('/delete/:email', async (req, res, next) => {
    try {

        const data = {email:req.params.email}
        const filename = (await service.findImagePath(data)).profilepath;
        imageRemover(filename)
        await service.deleteUser(data).then(result => {
            res.status(responce.getStatus(result)).json(responce.getMessage(result));
        })

    } catch (error) {
        console.log(error)
        const err = new CustomeError(500);
        next(err)
    }
})

router.get('/stream/:file', async (req, res, next) => {

    try {
        const filename = req.params.file;
        const path = `uploads/${filename}`;

        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

        const fileStream = fs.createReadStream(path);
        fileStream.pipe(res);

    } catch (error) {
        console.log(error)
        const err = new CustomeError(500);
        next(err)
    }

})



module.exports = { UserRouter: router }