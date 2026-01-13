FROM node:20-alpine

WORKDIR /app

# Install dependencies for canvas/webgl if needed
RUN apk add --no-cache libc6-compat

# Copy package files
COPY package*.json ./

# Install dependencies (using legacy-peer-deps for React 19 compatibility)
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Default command
CMD ["npm", "run", "dev"]
