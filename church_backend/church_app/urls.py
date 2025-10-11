from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'news', views.NewsViewSet)
router.register(r'events', views.EventViewSet)
router.register(r'gallery', views.GalleryViewSet)
router.register(r'schedule', views.ScheduleViewSet)
router.register(r'prayers', views.PrayerViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('submit-contact/', views.submit_contact, name='submit_contact'),
    path('submit-prayer/', views.submit_prayer_request, name='submit_prayer'),
    path('admin-dashboard/', views.admin_dashboard, name='admin_dashboard'),
    
    # Include admin URLs
    path('', include('church_app.admin_urls')),
]