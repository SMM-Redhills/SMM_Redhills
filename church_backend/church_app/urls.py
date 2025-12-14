# church_app/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views, auth_views

# Public API router
router = DefaultRouter()
router.register(r'news', views.NewsViewSet)
router.register(r'events', views.EventViewSet)
router.register(r'gallery', views.GalleryViewSet)
router.register(r'schedule', views.ScheduleViewSet)
router.register(r'prayers', views.PrayerViewSet)  # Public endpoint
router.register(r'banner-slides', views.BannerSlideViewSet)

urlpatterns = [
    path('', include(router.urls)),  # Public API endpoints
    path('submit-contact/', views.submit_contact, name='submit_contact'),
    path('submit-prayer/', views.submit_prayer_request, name='submit_prayer'),
    path('admin-dashboard/', views.admin_dashboard, name='admin_dashboard'),
    
    # Auth endpoints
    path('auth/login/', auth_views.admin_login, name='admin_login'),
    path('auth/logout/', auth_views.admin_logout, name='admin_logout'),
    path('auth/profile/', auth_views.admin_profile, name='admin_profile'),
    
    # Include admin URLs - this should point to your admin_urls.py
    path('admin/', include('church_app.admin_urls')),
]