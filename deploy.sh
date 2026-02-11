#!/bin/bash

# Deployment Script for SMM Redhills Church Backend
echo "Starting deployment process..."

# Navigate to backend directory
cd church_backend

# Install dependencies
echo "Installing dependencies..."
pip install -r requirements.txt

# Check if we need to create new migrations
echo "Checking for model changes..."
python manage.py makemigrations --dry-run

# Apply database migrations (this will handle both new and existing migrations)
echo "Applying database migrations..."
python manage.py migrate --verbosity=2

# Collect static files
echo "Collecting static files..."
python manage.py collectstatic --no-input

# Create superuser if it doesn't exist
echo "Creating superuser..."
python create_admin.py

echo "Deployment completed successfully!"
echo "Database migrations applied:"
python manage.py showmigrations
