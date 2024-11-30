const NotificationStrategy = require("./notificationStrategy");

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

module.exports = EmailNotification;