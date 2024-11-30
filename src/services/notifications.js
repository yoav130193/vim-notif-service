const EmailNotification = require("../notificationStrategy/emailStrategy");
const SmsNotification = require("../notificationStrategy/smsStrategy");

const userManager = require("../user/userManagerInstance");


const sendNotification = data => {
    // TODO Request Validations

    user = userManager.getUser(data)
    if (!user) {
        console.error('User not found');
        return false;
    }

    // Define strategies with their preference checks
    const strategies = defineStrategies(user, data)
    strategies
        .filter((strategy) => strategy.enabled) // Only include enabled strategies
        .forEach((strategy) => strategy.instance.send());

    console.log("Notifications had been sent to: ", user.email)

    return true;
};

function defineStrategies(user, data) {
    return [
        {
            enabled: user.preferences.email,
            instance: new EmailNotification(user, data),
        },
        {
            enabled: user.preferences.sms,
            instance: new SmsNotification(user, data),
        },
    ];
}

module.exports = {sendNotification};
