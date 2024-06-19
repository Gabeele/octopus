#!/bin/bash

# Ensure the script exits on the first error encountered
set -e

# Step 1: Pull the latest changes from the Git repository
echo "Pulling latest changes from Git repository..."
git pull origin main

# Step 2: Start the database service in detached mode
echo "Starting the database service..."
sudo docker compose up -d db

# Step 3: Build and run the web service in detached mode
echo "Building and starting the web service..."
cd ~/Octopus/octopus
npm install 
npm run build # Needs to run to make the directory before docker compose will create it and rerun 
cd ..
sudo docker compose up --build -d web

echo "Deployment completed successfully."
