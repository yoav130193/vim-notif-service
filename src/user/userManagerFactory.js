const InMemoryUserManager = require('./inMemoryUserManager');
const DbUserManager = require('./dbUserManager');

class UserManagerFactory {
    static initUserManager() {
        const useDb = process.env.USE_DB === 'true';
        const userManager = useDb ? new DbUserManager() : new InMemoryUserManager();
        console.log(`Using ${useDb ? 'DbUserManager' : 'InMemoryUserManager'}`);
        return userManager;
    }
}


module.exports = UserManagerFactory;
