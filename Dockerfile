FROM node:24-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install --omit=dev

# Copy bot files
COPY bot-xbox.js ./
COPY config.json ./

# Expose no ports (bot connects outbound)
# Run the bot
CMD ["npm", "start"]
