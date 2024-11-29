const express = require('express');
const router = express.Router();
const { sendNotification } = require('../services/notifications');


router.post('/send', (req, res) => {
    // TODO - verification to see that the request is valid
    const {userId, email, message} = req.body;

    try {
        const success = sendNotification({userId, email, message});
        if (success) {
            res.status(200).json({message: 'Notification sent successfully'});
        } else {
            res.status(500).json({error: 'Failed to send notification'});
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({error: error.message});
    }
});

module.exports = router;
