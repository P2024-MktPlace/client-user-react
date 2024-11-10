# Use the official Node.js image as a base image
FROM node:18-alpine AS builder

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

# Stage 2: Serve the build with NGINX
FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE ${PORT:-8080}

# Start server on specified port or default to 3000
CMD ["nginx", "-g", "daemon off;"]

