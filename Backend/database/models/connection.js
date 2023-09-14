const {Pool} = require('pg');

const dotenv = require('dotenv');
dotenv.config();

let mainConnection;
const credentials = {
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT
}


const connect=()=>{
    mainConnection= new Pool(credentials);
}

const getConnection=()=>{
    if(mainConnection){
        return mainConnection;
    }
    connect();
    return mainConnection;
}

module.exports={
    instanceofDB:getConnection
}