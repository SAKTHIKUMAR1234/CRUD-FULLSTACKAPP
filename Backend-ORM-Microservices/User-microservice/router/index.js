const express = require('express')
const router = express.Router()
const UserRouter = require('./User')
router.use('/user',UserRouter.UserRouter)


module.exports = router