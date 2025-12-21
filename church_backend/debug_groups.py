import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'church_project.settings')
django.setup()

from church_app.models import ParishGroup, GroupActivity

def check():
    print("--- Checking Groups and Activities ---")
    groups = ParishGroup.objects.all()
    for g in groups:
        print(f"Group: {g.name} (ID: {g.id}) | Description: {g.description[:20]}...")
        activities = g.activities.all()
        print(f"  Activity Count: {activities.count()}")
        for a in activities:
            print(f"    - Activity: {a.title} (ID: {a.id})")

    print("\n--- Checking All Activities directly ---")
    all_activities = GroupActivity.objects.all()
    for a in all_activities:
        print(f"Activity: {a.title} (ID: {a.id}) -> Group ID: {a.group_id}")

if __name__ == '__main__':
    check()
