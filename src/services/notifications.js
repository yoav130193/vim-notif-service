const axios = require('axios');
const userManager = require("../user/userManagerInstance");
const NOTIFICATION_SERVICE_URL = 'http://host.docker.internal:5001'


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

class NotificationStrategy {
    async send(type, url, body) {
        console.log('Yoav url:' + url)
        try {
            const response = await axios.post(NOTIFICATION_SERVICE_URL + url, body, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status === 200) {
                console.log(`${type} has been sent`)
            } else {
                console.log(`${type} has not sent`)
            }

        } catch (error) {
            // Future plans: add websocket support and send the user that the message didn't pass
            // OR: add a retry functionality to try again
            // Probably best to throw here an error and let the upper function to handle websocket/retry
            console.log(`${type} has not sent, error: ${error.message}`)
        }
    }
}

class EmailNotification extends NotificationStrategy {
    URL = '/send-email';

    constructor(user, data) {
        super();
        this.email = user.email;
        this.message = data.message;
    }

    send() {
        const body = {
            email: this.email,
            message: this.message
        }
        super.send('email', this.URL, body);
    }
}

class SmsNotification extends NotificationStrategy {
    URL = '/send-sms';

    constructor(user, data) {
        super();
        this.telephone = user.telephone;
        this.message = data.message;
    }

    send() {
        const body = {
            telephone: this.telephone,
            message: this.message
        }
        super.send('sms', this.URL, body);
    }
}


module.exports = {sendNotification};
