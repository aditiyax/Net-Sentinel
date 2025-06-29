# apps/api/api.Dockerfile

FROM node:18

WORKDIR /app

COPY apps/api/package.json ./
RUN npm install

# Copy the API source code
COPY apps/api ./

# Copy Prisma schema for codegen
COPY packages/db/prisma ./prisma

# Generate Prisma client
RUN npx prisma generate

CMD ["npm", "run", "dev"]
