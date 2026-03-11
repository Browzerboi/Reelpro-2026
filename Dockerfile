FROM node:22-alpine

# Install pnpm
RUN npm install -g pnpm@10.4.1

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Copy patches if they exist
COPY patches/ ./patches/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the app
RUN pnpm build

# Expose port
EXPOSE 3000

# Start the app
CMD ["pnpm", "start"]
