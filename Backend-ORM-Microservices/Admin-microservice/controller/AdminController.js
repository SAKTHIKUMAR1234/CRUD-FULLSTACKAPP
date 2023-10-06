const Admin = require('../../models/Admin')
const AdminVerificationTable = require('../../models/AdminVerification')
const db = require('../../config/database')
const construct = require('../util/adminDataConstructor')

const addAdmin = async (adminData, verificationData) => {
    db.transaction(async (t) => {
        const admin = await Admin.create(adminData, { transaction: t });
        const adminVerification = await AdminVerificationTable.create(verificationData, { transaction: t });
        await t.commit();
    }).catch((error) => {
        return error
    })

}

const findAdmin = async (data) => {
    try {
        const admin = await Admin.findOne({ where: { email: data.email } })
        const verificationData = await AdminVerificationTable.findOne({ where: { email: data.email } })
        const adminData = construct(admin.dataValues, verificationData.dataValues)
        return adminData 
    } catch (error) {
        return error
    }
}

const findIsExist = async (data) =>{
    try {
        const admin = await Admin.findOne({ where: { email: data.email } })
        if(!admin){
            return []
        }
        else{
            return admin
        }
    } catch (error) {
        return error
    }
}

const updateStatus = async (data) =>{
    try {
        const adminVerfication =await AdminVerificationTable.findOne({where:{email:data.email}}) 
        adminVerfication.status=true
        await adminVerfication.save()
        return await findAdmin(data)
    } catch (error) {
        return error
    }
}

const regenerateUrlUpdate =async (data) =>{
    try {
        const adminVerfication =await AdminVerificationTable.findOne({where:{email:data.email}}) 
        adminVerfication.token=data.token
        await adminVerfication.save()
        return await findAdmin(data)
    } catch (error) {
        return error
    }
} 

module.exports = { addAdmin, findAdmin ,updateStatus ,regenerateUrlUpdate ,findIsExist}