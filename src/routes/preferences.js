const express = require('express');
const {createUserPreference, editUserPreference} = require('../services/preferences');
const router = express.Router();

router.put('/edit', (req, res) => {
    const {email, telephone, preferences} = req.body;
    try {
        success = editUserPreference({email, telephone, preferences});
        if (success) {
            res.status(200).json({message: 'Preferences edited successfully'});
        } else {
            res.status(500).json({error: 'Failed to edit preferences'});
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({error: error.message});
    }

});

router.post('/create', (req, res) => {
    const {email, telephone, preferences} = req.body;
    try {
        success = createUserPreference({email, telephone, preferences});
        if (success) {
            res.status(200).json({message: 'Preferences created successfully'});
        } else {
            res.status(500).json({error: 'Failed to create preferences'});
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({error: error.message});
    }
});

module.exports = router;
