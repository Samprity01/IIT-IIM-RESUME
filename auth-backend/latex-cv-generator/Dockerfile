# Use a Node base image
FROM node:18

# Install required system packages
RUN apt-get update && \
    apt-get install -y texlive-full ghostscript && \
    apt-get clean

# Create app directory
WORKDIR /app

# Copy app files
COPY . .

# Install dependencies
RUN npm install

# Set environment variables
ENV NODE_ENV production
ENV PORT 3001

# Expose port
EXPOSE 3001

# Start command
CMD ["npm", "start"]
