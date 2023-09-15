const express = require('express')
const cors = require('cors');
const bodyparser = require('body-parser')
const app = express()
const routers = require('./router/index');
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv');
const ErrorHandler = require('./util/errorHandler');
const path=require('path')

app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(express.static(path.join(__dirname,'./public/uploads/')));
app.use(bodyparser.urlencoded({ extended: true }))
app.use(routers);
dotenv.config()


app.use(ErrorHandler);
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port number : --> ${process.env.PORT}`);
});

module.exports = app