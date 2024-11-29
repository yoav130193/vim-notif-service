class UserManager {
    constructor() {
    }

    addUser(email, telephone, preferences) {
        throw new Error('Method addUser must be implemented');
    }

    editUser(userId, data) {
        throw new Error('Method editUser must be implemented');
    }

    getUser(query) {
        throw new Error('Method getUser must be implemented');
    }

    getUserIdByEmail(email) {
        throw new Error('Method getUserIdByEmail must be implemented');
    }
}

module.exports = UserManager;