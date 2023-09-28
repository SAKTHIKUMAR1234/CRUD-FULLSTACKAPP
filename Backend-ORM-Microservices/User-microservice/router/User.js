const express = require ('express')
const router = express.Router()
const service = require ('../controller/userController')
const CustomeError = require('../../util/customeError')


router.get('/getAll', async (req, res, next) => {
    try {
        const data = req.user;
        const result =await service.getAllUser(data)
        return result
    } catch (error) {
        console.log(error)
        const err = new CustomeError(500);
        next(err)
    }
});

// router.post('/add', upload.single('photo'), async (req, res, next) => {
//     try {
        
//     } catch (error) {
//         console.log(error)
//         const err = new CustomeError(500);
//         next(err)
//     }
// })

// router.post('/update', upload.single('photo'), async (req, res, next) => {

//     try {
//         const body = req.body;
//         const profilePath = req.file.filename;
//         const flag = imageRemover(req.body.prevName)
//         if (flag) {
//             const details = [body.fname, body.lname, body.mobile, body.dob, body.address, profilePath, body.email];
//             await service.updateUser(details).then(result => {
//                 res.status(responce.getStatus(result)).json(responce.getMessage(result));
//             });
//         }
//         else {
//             console.log("Unable to remove Image")
//             const err = new CustomeError(500);
//             next(err)
//         }
//     } catch (error) {
//         console.log(error)
//         const err = new CustomeError(500);
//         next(err)
//     }


// })


// router.get('/find/:email', async (req, res, next) => {

//     try {
//         const data = req.params.email;
//         await service.findUser(data).then(result => {
//             res.status(responce.getStatus(result)).json(responce.getMessage(result));
//         });
//     } catch (error) {
//         console.log(error)
//         const err = new CustomeError(500);
//         next(err)
//     }
// })

// router.delete('/delete/:email', async (req, res, next) => {
//     try {

//         const data = req.params.email;
//         const filename = (await service.findImagePath(data)).profilepath;
//         imageRemover(filename)
//         await service.deleteUser(data).then(result => {
//             res.status(responce.getStatus(result)).json(responce.getMessage(result));
//         })

//     } catch (error) {
//         console.log(error)
//         const err = new CustomeError(500);
//         next(err)
//     }
// })

// router.get('/stream/:file', async (req, res, next) => {

//     try {
//         const filename = req.params.file;
//         const path = `public/uploads/${filename}`;

//         res.setHeader('Content-Type', 'application/octet-stream');
//         res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

//         const fileStream = fs.createReadStream(path);
//         fileStream.pipe(res);

//     } catch (error) {
//         console.log(error)
//         const err = new CustomeError(500);
//         next(err)
//     }

// })



module.exports = {UserRouter:router}