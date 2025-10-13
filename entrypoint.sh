#!/bin/sh

# Apply Prisma Migrations
echo "Attempting to migrate database"
npm run db:prod

# Start the App
echo "Starting UI service"
node server.js