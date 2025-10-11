from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import admin_views, auth_views

# Admin API Router
admin_router = DefaultRouter()
admin_router.register(r'contact-messages', admin_views.AdminContactMessageViewSet)
admin_router.register(r'prayer-requests', admin_views.AdminPrayerRequestViewSet)
admin_router.register(r'news', admin_views.AdminNewsViewSet)
admin_router.register(r'events', admin_views.AdminEventViewSet)
admin_router.register(r'gallery', admin_views.AdminGalleryViewSet)
admin_router.register(r'schedule', admin_views.AdminScheduleViewSet)
admin_router.register(r'prayers', admin_views.AdminPrayerViewSet)

urlpatterns = [
    # Admin Dashboard
    path('admin-dashboard/', admin_views.admin_dashboard_view, name='admin_dashboard'),
    
    # Auth endpoints
    path('auth/login/', auth_views.admin_login, name='admin_login'),
    path('auth/logout/', auth_views.admin_logout, name='admin_logout'),
    path('auth/profile/', auth_views.admin_profile, name='admin_profile'),
    
    # Admin API Stats
    path('admin/stats/', admin_views.admin_stats, name='admin_stats'),
    
    # Admin CRUD APIs
    path('admin/', include(admin_router.urls)),
    
    # Admin Actions
    path('admin/messages/<int:message_id>/mark-read/', admin_views.mark_message_read, name='mark_message_read'),
]