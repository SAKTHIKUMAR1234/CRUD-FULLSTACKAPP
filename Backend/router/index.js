const express=require('express');
const userRouter=require('./user')
const mainUserRouter=require('./mainUser');
const auth = require('./usersMiddlewere');
const router=express.Router();
router.use('/Users',auth,userRouter.userRouter);
router.use('/mainUser',mainUserRouter.mainUserRouter);
module.exports=router