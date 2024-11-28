const express = require('express');
const bodyParser = require('body-parser');

// Routes
const notificationsRoutes = require('./routes/notifications');
const preferencesRoutes = require('./routes/preferences');

// Initialize app
const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/notifications', notificationsRoutes);
app.use('/preferences', preferencesRoutes);

// Start server
const PORT =  8080;
app.listen(PORT, () => {
    console.log(`User Notifications Manager running on port ${PORT}`);
});
