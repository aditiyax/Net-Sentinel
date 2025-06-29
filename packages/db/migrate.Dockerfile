# migrate.Dockerfile

FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Install dependencies for Prisma and your workspace setup
RUN apk add --no-cache openssl

# Copy only package.json + lockfile first (for caching layers)
COPY package.json package-lock.json* ./

# Install deps (adjust if you use pnpm/yarn)
RUN npm install

# Copy Prisma schema and any shared packages (adjust as per your mono repo layout)
COPY ./packages/db ./packages/db


# Install Prisma CLI globally
RUN npm install -g prisma

# Set working dir to prisma package to run commands
WORKDIR /app/packages/db

# Run generate + migration
CMD ["sh", "-c", "prisma generate && prisma migrate deploy"]
