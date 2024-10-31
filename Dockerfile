# Use the official Node.js image as a base image
FROM node:18 as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Build the application for production
RUN npm run build

# Use a lightweight server to serve the build
FROM nginx:alpine

# Copy the build output to NGINX's html directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 8080 for the server
EXPOSE 8080

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]
