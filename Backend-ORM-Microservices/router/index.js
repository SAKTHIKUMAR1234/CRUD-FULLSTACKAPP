const router = require('express')()
require('dotenv').config()

const expressProxy = require('express-http-proxy')


const userProxy = expressProxy(process.env.USER_PROXY_URL);
const adminProxy = expressProxy(process.env.ADMIN_PROXY_URL);

router.use('/auth', userProxy)
router.use('/admin', adminProxy)


module.exports=router