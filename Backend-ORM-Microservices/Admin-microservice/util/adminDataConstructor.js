

const construct = (adminData,statusData)=>{
    const data = {
        id : adminData.id,
        email : adminData.email,
        fname : adminData.fname,
        lname : adminData.lname,
        mobile : adminData.mobile,
        password : adminData.password,
        status:statusData.status,
        verifyUrl:statusData.token
    }
    return data;
}

module.exports=construct