class UserManager {
    constructor() {
        this.userMap = {}; // Key: userId, Value: user object
        this.emailToUserIdMap = {}; // Key: email, Value: userId
    }

    // Add a user
    addUser(email, telephone, preferences) {
        const userId = uuidv4(); // Generate a unique ID
        this.userMap[userId] = {email, telephone, preferences}; // Add user to userMap
        this.emailToUserIdMap[email] = userId; // Add email mapping
    }

    // Get user by userId
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

    getUser({userId, email}) {
        if (userId) {
            return this.getUserById(userId);
        } else if (email) {
            return this.getUserByEmail(email);
        } else {
            return null
        }
    }

    editUser(userId, data) {
        this.userMap[userId] = data; // Add user to userMap
        this.emailToUserIdMap[data.email] = userId; // Add email mapping
    }
}

const userManager = new UserManager();

module.exports = userManager;

