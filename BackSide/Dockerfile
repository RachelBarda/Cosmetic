# Use the official Node.js image as the base
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first
COPY ./NodeJS/package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the app
COPY ./NodeJS/ . 



# Production Stage (Smaller Image)
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app .

# Expose the port your app runs on
EXPOSE 5050

# Start the application
CMD ["node", "App.js"]

