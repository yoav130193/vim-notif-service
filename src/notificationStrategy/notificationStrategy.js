const axios = require("axios");
const NOTIFICATION_SERVICE_URL = 'http://host.docker.internal:5001'

class NotificationStrategy {
    async send(type, url, body) {
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

module.exports = NotificationStrategy