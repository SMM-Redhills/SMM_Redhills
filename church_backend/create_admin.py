import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'church_project.settings')
django.setup()

from django.contrib.auth.models import User

username = os.getenv('ADMIN_USERNAME', 'Churchadmin')
password = os.getenv('ADMIN_PASSWORD', '!123,Abc')
email = 'admin@example.com'

if not User.objects.filter(username=username).exists():
    print(f"Creating superuser '{username}'...")
    User.objects.create_superuser(username, email, password)
    print("Superuser created successfully.")
else:
    print(f"Superuser '{username}' already exists.")
