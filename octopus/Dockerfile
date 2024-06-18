# Use the official Node.js image as the base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

RUN npm install -g prisma

# Copy the rest of the application code to the working directory
COPY . .

# Run Prisma migrations
RUN npx prisma migrate dev

# Generate Prisma client
RUN npx prisma generate

# Expose the port that the application will run on
EXPOSE 3000

# Command to run the application in production mode
CMD ["npm", "run", "start"]
