const Admin = require('../../models/Admin')

const addAdmin =async (data) =>{
    try {
        console.log(data);
        const admin =await Admin.create(data)
        admin.save()
        return admin
    } catch (error) {
        return error
    }
}

const findAdmin = async (data) =>{
    try{
        const admin =await Admin.findOne({where:{email:data.email}})
        if(!admin){
            throw new Error('Admin Not Found')
        }
        else{
            return admin
        }
    }
    catch(error){
        return error
    }
}

module.exports={addAdmin,findAdmin}