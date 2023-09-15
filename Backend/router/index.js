const express=require('express');
const userRouter=require('./user')
const mainUserRouter=require('./mainUser');
const auth = require('./usersMiddlewere');
const router=express.Router();
router.use('/Users',auth,userRouter);
router.use('/mainUser',mainUserRouter);
module.exports=router