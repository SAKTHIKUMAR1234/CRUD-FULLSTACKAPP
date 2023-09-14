const { instanceofDB } = require("../../models/connection");



const addUser = async (data) => {
    try {
        const con = instanceofDB();
        const result = await con.query('insert into mainuser (fname,lname,mobile,email,password) values($1,$2,$3,$4,$5)', data);
        return result;
    } catch (error) {
        return error;
    }

}

const findUser = async (data) => {
    try {
        const con = instanceofDB();
        const result = await con.query('select * from mainuser where email=$1',[data]);
        return result.rows;
    } catch (error) {
        console.log(error);
        return error;
    }
}


module.exports={
    addUser,findUser
}