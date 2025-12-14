# church_app/admin_urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import admin_views

router = DefaultRouter()
# Register all admin viewsets here
router.register(r'contact-messages', admin_views.AdminContactMessageViewSet)
router.register(r'prayer-requests', admin_views.AdminPrayerRequestViewSet)
router.register(r'news', admin_views.AdminNewsViewSet)
router.register(r'events', admin_views.AdminEventViewSet)
router.register(r'gallery', admin_views.AdminGalleryViewSet)
router.register(r'schedule', admin_views.AdminScheduleViewSet)
router.register(r'prayers', admin_views.AdminPrayerViewSet)  # This was missing!

urlpatterns = [
    path('', include(router.urls)),
    path('stats/', admin_views.admin_stats),
    path('mark-message-read/<int:message_id>/', admin_views.mark_message_read),
]