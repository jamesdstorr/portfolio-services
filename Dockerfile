# Use an official Node.js runtime as the base image
FROM node:21.5.0

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port that your Apollo Server will listen on (change to your port)
EXPOSE 8000

# Define the command to start your Apollo Server using npm
CMD [ "npm", "start" ]
