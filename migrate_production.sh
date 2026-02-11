#!/bin/bash

# Production Migration Script for SMM Redhills Church Backend
echo "Starting production migration process..."

# Navigate to backend directory
cd church_backend

# Check current migration status
echo "Current migration status:"
python manage.py showmigrations

# Create any new migrations if needed
echo "Checking for new migrations..."
python manage.py makemigrations

# Apply all migrations
echo "Applying all migrations..."
python manage.py migrate --verbosity=2

# Show final migration status
echo "Final migration status:"
python manage.py showmigrations

echo "Production migration completed!"
