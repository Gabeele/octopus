#!/bin/bash

# Load environment variables from .env file
export $(grep -v '^#' .env | xargs)

# Container name
CONTAINER_NAME="db"

# Set environment variables from .env file
PGHOST=$PGSQL_HOST
PGPORT=$PGSQL_PORT
PGUSER=$PGSQL_USER
PGPASSWORD=$PGSQL_PASSWORD
PGDATABASE=$PGSQL_DATABASE
BACKUP_DIR="./pgdata"

# Find the latest backup file
LATEST_BACKUP=$(find $BACKUP_DIR -type f -name "*.sql" -print0 | xargs -0 ls -t | head -n 1)

# Check if a backup file was found
if [ -z "$LATEST_BACKUP" ]; then
  echo "No backup file found!"
  exit 1
fi

echo "Restoring from backup: $LATEST_BACKUP"

# Drop the existing database and create a new one
sudo docker exec -e PGPASSWORD=$PGPASSWORD $CONTAINER_NAME psql -U $PGUSER -h $PGHOST -p $PGPORT -c "DROP DATABASE IF EXISTS $PGDATABASE;"
sudo docker exec -e PGPASSWORD=$PGPASSWORD $CONTAINER_NAME psql -U $PGUSER -h $PGHOST -p $PGPORT -c "CREATE DATABASE $PGDATABASE;"

# Restore the database from the backup
cat $LATEST_BACKUP | sudo docker exec -i -e PGPASSWORD=$PGPASSWORD $CONTAINER_NAME psql -U $PGUSER -h $PGHOST -p $PGPORT $PGDATABASE

# Optionally, notify the user of completion
echo "Restore completed successfully!"
