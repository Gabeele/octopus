#!/bin/bash

echo "starting backup"

# Load environment variables from .env file
export $(grep -v '^#' .env | xargs)

# container name
CONTAINER_NAME="db"

# Set environment variables from .env file
PGHOST=$PGSQL_HOST
PGPORT=$PGSQL_PORT
PGUSER=$PGSQL_USER
PGPASSWORD=$PGSQL_PASSWORD
PGDATABASE=$PGSQL_DATABASE
BACKUP_DIR="./pgdata"

# Create a timestamp
TIMESTAMP=$(date +"%F-%H-%M-%S")

# Backup filename
BACKUP_FILE="$BACKUP_DIR/$PGDATABASE-$TIMESTAMP.sql"

echo "Attempting to connect to docker..."

# Run pg_dump inside the PostgreSQL container
sudo docker exec -e PGPASSWORD=$PGPASSWORD $CONTAINER_NAME pg_dump -U $PGUSER -h $PGHOST -p $PGPORT $PGDATABASE > $BACKUP_FILE

# Check if the backup file was created successfully
if [ -f "$BACKUP_FILE" ]; then
  echo "Backup was created successfully: $BACKUP_FILE"
else
  echo "Backup failed: $BACKUP_FILE was not created."
  exit 1
fi

# Optionally, remove old backups (older than 7 days in this example)
find $BACKUP_DIR -type f -name "*.sql" -mtime +7 -exec rm {} \;

