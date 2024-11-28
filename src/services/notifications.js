const axios = require('axios');
const userManager = require('./userManager');


const sendNotification = data => {
    // TODO Validations
    // Email Validation
    // Phone Validation

    // TODO Format Corrections

    // TODO - Retrieve User from hash
    user = userManager.getUser(data)
    if (!user) {
        console.error('User not found');
        return false;
    }

    if (user.preferences.email) {
        sendEmail(user.email, data.message)
            .then(response => {
                console.log('Email sent successfully, response:' + response);
            })
            .catch(error => {
                console.error('Failed to send email because of error: ' + error.message);
            })

    }

    if (user.preferences.sms) {
        sendSms(user.telephone, data.message)
            .then(response => {
                console.log('SMS sent successfully, response:' + response);
            })
            .catch(error => {
                console.error('Failed to send sms because of error: ' + error.message);
            })
    }

    return true;
};

const sendEmail = async (email, message) => {
    try {
        const response = await axios.post('http://localhost:5001/send-email', {
            email: email,
            message: message
        });

        if (response.status !== 200) {
            console.log("Email has not sent")
        }

    } catch (error) {
        console.log("Email has not sent, error: " + error.message)
    }
};

const sendSms = async (telephone, message) => {
    try {
        const response = await axios.post('http://localhost:5001/send-sms', {
            telephone: telephone,
            message: message
        });

        if (response.status !== 200) {
            console.log("SMS has not sent")
        }

    } catch (error) {
        console.log("SMS has not sent, error:" + error.message)
    }
};

module.exports = {sendNotification};
