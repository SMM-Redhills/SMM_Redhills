from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import render
from django.http import JsonResponse
from .models import ContactMessage, PrayerRequest, News, Event, Gallery, Schedule, Prayer, BannerSlide, ParishGroup, GroupActivity
from .serializers import (
    ContactMessageSerializer, PrayerRequestSerializer, NewsSerializer, 
    EventSerializer, GallerySerializer, ScheduleSerializer, PrayerSerializer, BannerSlideSerializer,
    ParishGroupSerializer, GroupActivitySerializer
)

# Form submission views
@api_view(['POST'])
def submit_contact(request):
    serializer = ContactMessageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Contact message sent successfully'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def submit_prayer_request(request):
    serializer = PrayerRequestSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Prayer request submitted successfully'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Public API views
class NewsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = News.objects.filter(is_published=True)
    serializer_class = NewsSerializer

class EventViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class GalleryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Gallery.objects.all()
    serializer_class = GallerySerializer

class ScheduleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer

class PrayerViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Prayer.objects.all()
    serializer_class = PrayerSerializer

class BannerSlideViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = BannerSlide.objects.filter(is_active=True)
    serializer_class = BannerSlideSerializer

class ParishGroupViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ParishGroup.objects.all()
    serializer_class = ParishGroupSerializer
    lookup_field = 'name'

class GroupActivityViewSet(viewsets.ModelViewSet):
    queryset = GroupActivity.objects.all()
    serializer_class = GroupActivitySerializer

# Admin Dashboard View
def admin_dashboard(request):
    if not request.user.is_staff:
        return JsonResponse({'error': 'Access denied'}, status=403)
    
    stats = {
        'contact_messages': ContactMessage.objects.filter(is_read=False).count(),
        'prayer_requests': PrayerRequest.objects.count(),
        'news_count': News.objects.count(),
        'events_count': Event.objects.count(),
        'gallery_count': Gallery.objects.count(),
    }
    
    
    
    from django.http import HttpResponse
    return HttpResponse(dashboard_html)