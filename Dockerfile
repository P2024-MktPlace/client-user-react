# Use the official Node.js image as a base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Build the application for production
RUN npm run build

# Install 'serve' to serve the build directory
RUN npm install -g serve

# Expose a dynamic port if specified, or default to 3000
EXPOSE ${PORT:-8080}

# Start server on specified port or default to 3000
CMD ["sh", "-c", "serve -s build -l ${PORT:-8080}"]
