# use the official Node.js image as base
FROM node:18-alpine3.19

# Set the working directory inside the container
WORKDIR /usr/serc/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Expose the port on wich application listens
EXPOSE 3007

# Start the application
CMD [ "node", "index.js" ]