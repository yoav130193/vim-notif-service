# User Notification Service API

This repository contains the backend implementation for a User Notification Service API, allowing users to send
notifications and manage user preferences for communication channels such as email and SMS.

---

## Features

- **Notification Sending**: Send notifications to users via email and SMS based on user preferences.
- **User Preference Management**:
    - Create new user notification preferences.
    - Edit existing user notification preferences.

---

## API Endpoints

### Notification Routes

#### **POST `/send`**

Send a notification to a user based on their preferences.

**Request Body Options**:

```json
{
  "email": "user@example.com",
  "message": "Hello, this is your notification!"
}
```

```json
{
  "userId": "12345",
  "message": "Hello, this is your notification!"
}
```

**Responses**:

- `200 OK`: Notification sent successfully.
- `500 Internal Server Error`: Failed to send notification.

---

### Preference Management Routes

#### **PUT `/edit`**

Edit an existing user's preferences.

**Request Body**:

```json
{
  "email": "user@example.com",
  "telephone": "1234567890",
  "preferences": {
    "email": true,
    "sms": false
  }
}
```

**Responses**:

- `200 OK`: Preferences edited successfully.
- `500 Internal Server Error`: Failed to edit preferences.

#### **POST `/create`**

Create a new user's notification preferences.

**Request Body**:

```json
{
  "email": "user@example.com",
  "telephone": "1234567890",
  "preferences": {
    "email": true,
    "sms": false
  }
}
```

**Responses**:

- `200 OK`: Preferences created successfully.
- `500 Internal Server Error`: Failed to create preferences.

---

## Code Overview

### **Notification Strategies**

Notification handling is implemented using the **Strategy Pattern**, enabling flexible addition or modification of
communication channels. For new channels implement a new `NotificationStrategy` class and add it's preference indicator to `defineStrategies` method.

Current options:
- **EmailNotification**: Handles email notifications.
- **SmsNotification**: Handles SMS notifications.

---

### **Services**

- **Notification Service (`services/notifications`)**:
    - Defines strategies and sends notifications to enabled channels.
- **Preference Service (`services/preferences`)**:
    - Manages user preference creation and modification.

---
### **User Management System**

The UserManager system is responsible for handling user data and supports currently only in-memory storage. It uses a factory design pattern to determine the implementation at runtime.

In-Memory Storage is Enabled when `USE_DB=false` (default).
Stores all user data in memory.

---

### **Error Handling**

- Handles exceptions and logs errors to the console.
- Implements future-ready hooks for retry mechanisms and WebSocket error notifications.

---

## Setup

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/notification-service.git
   cd notification-service
   ```

2. Run notification service and user notification services via Docker:
   ```bash
   docker-compose up --build
   ```

---

## Testing

### Local Testing

Use tools like **Postman** or **cURL** to test API endpoints.

#### Example Request:

```bash
# Send Notification to user by email or userId.
curl -X POST http://localhost:3000/send \
-H "Content-Type: application/json" \
-d '{"userId":"12345", "email":"user@example.com", "message":"Test message"}'

# Create User Preferences
curl -X POST http://localhost:3000/create \
-H "Content-Type: application/json" \
-d '{"email": "user@example.com", "telephone": "1234567890", "preferences": {"email": true, "sms": false}}'

# Edit User Preferences
curl -X PUT http://localhost:3000/edit \
-H "Content-Type: application/json" \
-d '{"email": "user@example.com", "telephone": "1234567890", "preferences": {"email": true, "sms": true}}'
```

## Future Enhancements

1. **Retry Mechanism**:
    - Automatically retry failed notification attempts.
2. **WebSocket Support**:
    - Notify users of failed deliveries in real time.
3. **Validations**:
    - Validate a valid request and existence of notification channels

---