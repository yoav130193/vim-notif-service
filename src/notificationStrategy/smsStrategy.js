const NotificationStrategy = require("./notificationStrategy");


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

module.exports = SmsNotification;