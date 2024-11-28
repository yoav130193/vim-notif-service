# Use an official Node.js runtime as the base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package.json ./

# Install dependencies
RUN npm install
RUN npm install -g nodemon

# Copy the source code to the container
COPY src ./src

# Set the working directory to /app/src for running the service
WORKDIR /app/src

# Expose the port that the app runs on (adjust if necessary)
EXPOSE 3000

# Start the application
CMD ["nodemon", "--watch", ".", "--legacy-watch", "app.js"]
