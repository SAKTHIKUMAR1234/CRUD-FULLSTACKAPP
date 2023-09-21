const { format } = require('../../../util/dataformat');
const { instanceofDB } = require('../../models/connection')


const getUsers = async () => {
    try {
        const con = instanceofDB();
        let result = await con.query('select * from Userdetails order by dateofupdation desc');
        result = format(result.rows);
        return result;
    } catch (error) {
        return error

    }
}

const updateUser = async (data) => {

    try {
        const con = instanceofDB();
        const result = await con.query('update userdetails set fname=$1,lname=$2,mobile=$3,dob=$4,address=$5,dateofupdation=current_timestamp,profilepath=$6 where email=$7', data);
        return result;
    } catch (error) {
        return error;
    }


}


const addUser = async (data) => {
    try {
        const con = instanceofDB();
        const result = await con.query('insert into Userdetails (email,fname,lname,mobile,dob,address,profilepath) values ($1,$2,$3,$4,$5,$6,$7)', data);
        return result;
    } catch (error) {
        return error;
    }

}

const findUser = async (data) => {

    try {
        const con = instanceofDB();
        const result = await con.query('select * from Userdetails where email=$1', [data]);
        return result;

    } catch (error) {
        return error;
    }

}

const deleteUser = async (data) =>{
    try {
        const con = instanceofDB();
        const result = await con.query('delete from userDetails where email=$1',[data]);
        return result;
    } catch (error) {
        return error;
    }
}


const findImagePath = async (data) =>{
    try {
        const con = instanceofDB();
        const result = await con.query('select profilepath from userDetails where email=$1',[data]);
        return result.rows[0];
    } catch (error) {
        return error;
    }
}

module.exports = {
    getUsers, updateUser, addUser, findUser, deleteUser, findImagePath
}