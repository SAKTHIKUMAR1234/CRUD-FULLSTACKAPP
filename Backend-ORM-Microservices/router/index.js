const router = require('express')()
require('dotenv').config()
const auth = require('../util/authMiddleware')

const expressProxy = require('express-http-proxy')

const userProxy = expressProxy(process.env.USER_PROXY_URL,{
    parseReqBody:false
});
const adminProxy = expressProxy(process.env.ADMIN_PROXY_URL);

router.use('/auth',auth, userProxy)
router.use('/admin', adminProxy)



module.exports=router