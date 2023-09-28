const router =require('express').Router();
const mailRouter = require('./mailRoute')

router.use('/mailsending',mailRouter);

module.exports=router
