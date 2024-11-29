const {v4: uuidv4} = require('uuid');
const UserManager = require("./userManager");

class InMemoryUserManager extends UserManager {
    constructor() {
        super();
        this.userMap = {}; // Key: userId, Value: user object
        this.emailToUserIdMap = {}; // Key: email, Value: userId
    }

    addUser(email, telephone, preferences) {
        const userId = uuidv4(); // Generate a unique ID
        this.userMap[userId] = {email, telephone, preferences}; // Add user to userMap
        this.emailToUserIdMap[email] = userId; // Add email mapping
    }

    getUser(query) {
        if (query.userId) {
            return this.userMap[query.userId] || null;
        } else if (query.email) {
            const userId = this.emailToUserIdMap[query.email];
            return userId ? this.userMap[userId] : null;
        }
        return null;
    }

    editUser(userId, data) {
        this.userMap[userId] = data;
        this.emailToUserIdMap[data.email] = userId;
    }

    getUserById(userId) {
        return this.userMap[userId] || null;
    }

    // Get userId by email
    getUserIdByEmail(email) {
        return this.emailToUserIdMap[email] || null;
    }

    // Get user by email
    getUserByEmail(email) {
        const userId = this.getUserIdByEmail(email);
        return userId ? this.getUserById(userId) : null;
    }
}


module.exports = InMemoryUserManager;
