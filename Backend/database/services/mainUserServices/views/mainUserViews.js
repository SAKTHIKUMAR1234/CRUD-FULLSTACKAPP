const { instanceofDB } = require("../../../models/connection")

const getMainUserStatus = async (user) =>{
    try {
        const con = instanceofDB();
        const result =await con.query('select * from mainuserstatusview where email = $1',[user]);
        return result.rows[0];
    } catch (error) {
        return error;
    }
}


const updateMainUserStatus = async (user) =>{
    try {
        const con = instanceofDB();
        const result = await con.query('update loginEmailstatus set status=true where emailid=$1',[user]);
        return result;
    } catch (error) {
        return error;
    }
}

const updateMainUserVerification = async (data) =>{
    try {
        const con = instanceofDB();
        const result = await con.query('update loginEmailstatus set verificationtoken = $1 where emailid = $2',data);
        return result;
    } catch (error) {
        return error;
    }
}

module.exports={getMainUserStatus,updateMainUserStatus,updateMainUserVerification}