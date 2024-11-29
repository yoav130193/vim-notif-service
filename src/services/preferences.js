const userManager = require("../user/userManagerInstance");

const editUserPreference = data => {
    userId = userManager.getUserIdByEmail(data.email)
    if (!userId) {
        console.error('User not found');
        return false;
    }

    userManager.editUser(userId, data)
    return true
}

const createUserPreference = data => {
    userId = userManager.getUserIdByEmail(data.email)
    if (userId) {
        console.error('User already exists');
        return false;
    }

    userManager.addUser(data.email, data.telephone, data.preferences)
    return true
}


module.exports = {editUserPreference, createUserPreference};