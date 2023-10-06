const User = require('../../models/Users')

const insertUser = async (data) => {
    try {
        const user = await User.create(data)
        await user.save()
        return user;
    } catch (error) {
        return error
    }
}

const updateUser = async (data) => {
    try {
        const user = await User.findOne({ where: { email: data.email } })
        if (!user) {
            throw new Error("User Not Found");
        }
        else {
            user.dob = data.dob
            user.fname = data.fname
            user.lname = data.lname
            user.address = data.address
            user.profilepicname = data.profilepicname

            await user.save()
            return user
        }
    } catch (error) {
        return error
    }
}


const findUser = async (data) => {
    try {
        const user = await User.findOne({ where: { email: data.email } })
        if(!user) return []
        return user
    } catch (error) {
        return error
    }
}


const deleteUser = async (data) => {
    try {
        const user = await User.destroy({ where: { email: data.email } })
        if (user === 0) {
            throw new Error("User Not Found")
        }
        else {
            return user
        }
    } catch (error) {
        return error
    }
}


const getAllUser = async (data) => {
    try {
        const user = await User.findAll({ where: { createdByAdminId: data.user.id } })
        return user
    } catch (error) {
        return error
    }
}

const findImagePath = async (data) => {
    try {
        const user = await User.findOne({ where: { email: data.email } })
        if (user === 0) {
            throw new Error("User Not Found")
        }
        else {
            return user.profilepicname
        }
    } catch (error) {
        return error
    }
}

module.exports = {
    insertUser,
    deleteUser,
    findImagePath,
    findUser,
    getAllUser,
    updateUser
}