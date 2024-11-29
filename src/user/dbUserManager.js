const UserManager = require('./userManager');

class DbUserManager extends UserManager {
    constructor() {
        super();
    }

    addUser(email, telephone, preferences) {
        console.log(`Adding user to DB: ${email}`);
        return null;
    }

    editUser(userId, data) {
        console.log(`Editing user in DB: ${userId}`);
        return null;
    }

    getUser(query) {
        console.log(`Getting user from DB: ${JSON.stringify(query)}`);
        return null;
    }

    getUserIdByEmail(email) {
        console.log(`Getting userId from DB: ${JSON.stringify(query)}`);
        return null;
    }
}

module.exports = DbUserManager;
