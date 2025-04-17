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
ENV PORT 3000

# Expose port
EXPOSE 3000

# Start command
CMD ["node", "server.js"]