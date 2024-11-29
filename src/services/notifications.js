const axios = require('axios');
const userManager = require('./userManager');
const NOTIFICATION_SERVICE_URL = 'http://localhost:5001'

const sendNotification = data => {
    // TODO Request Validations

    user = userManager.getUser(data)
    if (!user) {
        console.error('User not found');
        return false;
    }

    user.preferences.email && sendEmail(user.email, data.message)
    user.preferences.sms && sendSms(user.telephone, data.message)


    return true;
};

const sendEmail = async (email, message) => {
    try {
        const response = await axios.post(NOTIFICATION_SERVICE_URL + '/send-email', {
            email: email,
            message: message
        });

        if (response.status === 200) {
            console.log("Email has been sent")
        } else {
            console.log("Email has not sent")
        }

    } catch (error) {
        // Future plans: add websocket support and send the user that the message didn't pass
        // OR: add a retry functionality to try again
        // Probably best to throw here an error and let the upper function to handle websocket/retry
        console.log("Email has not sent, error: " + error.message)
    }
};

const sendSms = async (telephone, message) => {
    try {
        const response = await axios.post(NOTIFICATION_SERVICE_URL + '/send-sms', {
            telephone: telephone,
            message: message
        });

        if (response.status === 200) {
            console.log("SMS has been sent")
        } else {
            console.log("SMS has not sent")
        }

    } catch (error) {
        // Future plans: add websocket support and send the user that the message didn't pass
        // OR: add a retry functionality to try again
        // Probably best to throw here an error and let the upper function to handle websocket/retry
        console.log("SMS has not sent, error: " + error.message)
    }
};

module.exports = {sendNotification};
