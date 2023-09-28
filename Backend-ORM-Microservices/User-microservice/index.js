const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./router/index')
const errorHandler = require('../util/errorHandler')

app.use(cors({
    origin:true,
    credentials:true
}))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(errorHandler)
app.use(router)


app.listen(3001,()=>{
    console.log("Auth-Proxy running at--->",3001)
})




