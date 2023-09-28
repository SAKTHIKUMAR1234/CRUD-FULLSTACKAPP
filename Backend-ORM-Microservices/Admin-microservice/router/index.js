const router =require('express').Router()
const adminRouter = require('./adminRouter')

router.use('/services',adminRouter)

module.exports=router