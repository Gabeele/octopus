#!/bin/bash

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

# Run pg_dump inside the PostgreSQL container
sudo docker exec -e PGPASSWORD=$PGPASSWORD $CONTAINER_NAME pg_dump -U $PGUSER -h $PGHOST -p $PGPORT $PGDATABASE > $BACKUP_FILE

# Optionally, remove old backups (older than 7 days in this example)
find $BACKUP_DIR -type f -name "*.sql" -mtime +7 -exec rm {} \;
