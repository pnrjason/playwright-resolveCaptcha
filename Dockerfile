# Use Playwright-ready base image
FROM mcr.microsoft.com/playwright:bionic

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

<<<<<<< HEAD
# Install dependencies
RUN npm install

=======
# Install Node.js dependencies
RUN npm install

# Ensure Playwright browsers are installed
RUN npx playwright install

>>>>>>> origin/master
# Copy local code to the container
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "server.js"]
