const userManager = require('./userManager');

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
    // userId = uuid.v4();
    // TODO - Validation
    // TODO - check if user exist

    userManager.addUser("1234", data.email, data.telephone, data.preferences)
    return true
}

module.exports = {editUserPreference, createUserPreference};