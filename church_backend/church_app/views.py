from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import render
from django.http import JsonResponse
from .models import ContactMessage, PrayerRequest, News, Event, Gallery, Schedule, Prayer
from .serializers import (
    ContactMessageSerializer, PrayerRequestSerializer, NewsSerializer, 
    EventSerializer, GallerySerializer, ScheduleSerializer, PrayerSerializer
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
    
    dashboard_html = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <title>Church Admin Dashboard</title>
        <style>
            body {{ font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }}
            .header {{ background: #0284c7; color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }}
            .stats {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }}
            .stat-card {{ background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }}
            .stat-number {{ font-size: 2rem; font-weight: bold; color: #0284c7; }}
            .sections {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }}
            .section {{ background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }}
            .btn {{ background: #0284c7; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; text-decoration: none; display: inline-block; margin: 5px; }}
            .btn:hover {{ background: #0369a1; }}
        </style>
    </head>
    <body>
        <div class="header">
            <h1>Saint Mary Magdalene Church - Admin Dashboard</h1>
            <p>Manage your church content and view submissions</p>
        </div>

        <div class="stats">
            <div class="stat-card">
                <div class="stat-number">{stats['contact_messages']}</div>
                <div>Unread Messages</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">{stats['prayer_requests']}</div>
                <div>Prayer Requests</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">{stats['news_count']}</div>
                <div>News Articles</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">{stats['events_count']}</div>
                <div>Events</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">{stats['gallery_count']}</div>
                <div>Gallery Items</div>
            </div>
        </div>

        <div class="sections">
            <div class="section">
                <h3>📧 Contact Messages</h3>
                <p>View and respond to contact form submissions</p>
                <a href="/admin/church_app/contactmessage/" class="btn">Manage Messages</a>
            </div>

            <div class="section">
                <h3>🙏 Prayer Requests</h3>
                <p>Review prayer requests from community</p>
                <a href="/admin/church_app/prayerrequest/" class="btn">View Requests</a>
            </div>

            <div class="section">
                <h3>📰 News & Events</h3>
                <p>Add and manage news articles and events</p>
                <a href="/admin/church_app/news/" class="btn">Manage News</a>
                <a href="/admin/church_app/event/" class="btn">Manage Events</a>
            </div>

            <div class="section">
                <h3>📸 Gallery</h3>
                <p>Upload and organize photos and videos</p>
                <a href="/admin/church_app/gallery/" class="btn">Manage Gallery</a>
            </div>

            <div class="section">
                <h3>📅 Schedule</h3>
                <p>Update mass times and church schedule</p>
                <a href="/admin/church_app/schedule/" class="btn">Manage Schedule</a>
            </div>

            <div class="section">
                <h3>📖 Prayers</h3>
                <p>Add prayers in English and Tamil</p>
                <a href="/admin/church_app/prayer/" class="btn">Manage Prayers</a>
            </div>
        </div>
    </body>
    </html>
    """
    
    from django.http import HttpResponse
    return HttpResponse(dashboard_html)