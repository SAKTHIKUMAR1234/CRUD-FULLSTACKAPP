const User = require('../../models/Users')

const insertUser = async (data) => {
    try {
        const user = await User.create(data)
        user.save()
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
        if (!user) {
            throw new Error("User Not Found")
        }
        else {
            return user
        }
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

const getUserCount = async (data) => {
    try {
        const userCount = await User.count({ where: { email: data.user.id } })
        return userCount
    } catch (error) {
        return error
    }
}

const paginationUserData = async (data) => {
    try {
        const page = data.user.currentPage
        const perPage = data.user.pageLimit
        const offset = (page - 1) * perPage
        const userDetails = await User.findAndCountAll({
            where: { createdByAdminId: data.user.id },
            offset: offset,
            limit: perPage,
            order: [['updatedAt', 'ASC']],
        })
        return userDetails
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
    getUserCount,
    paginationUserData,
    updateUser
}