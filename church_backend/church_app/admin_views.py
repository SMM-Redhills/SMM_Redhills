from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from django.contrib.auth.decorators import login_required, user_passes_test
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.utils import timezone
from .models import ContactMessage, PrayerRequest, News, Event, Gallery, Schedule, Prayer, BannerSlide
from .serializers import (
    ContactMessageSerializer, PrayerRequestSerializer, NewsSerializer, 
    EventSerializer, GallerySerializer, ScheduleSerializer, PrayerSerializer, BannerSlideSerializer
)

def is_staff(user):
    return user.is_staff

@api_view(['GET'])
@permission_classes([IsAdminUser])
def admin_stats(request):
    """Get dashboard statistics"""
    stats = {
        'unread_messages': ContactMessage.objects.filter(is_read=False).count(),
        'total_messages': ContactMessage.objects.count(),
        'prayer_requests': PrayerRequest.objects.count(),
        'published_news': News.objects.filter(is_published=True).count(),
        'total_news': News.objects.count(),
        'upcoming_events': Event.objects.filter(date__gte=timezone.now()).count(),
        'total_events': Event.objects.count(),
        'gallery_items': Gallery.objects.count(),
        'schedules': Schedule.objects.count(),
        'prayers': Prayer.objects.count(),
        'banner_slides': BannerSlide.objects.count(),
    }
    return Response(stats)

# Admin CRUD ViewSets
class AdminContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [IsAdminUser]

class AdminPrayerRequestViewSet(viewsets.ModelViewSet):
    queryset = PrayerRequest.objects.all()
    serializer_class = PrayerRequestSerializer
    permission_classes = [IsAdminUser]

class AdminNewsViewSet(viewsets.ModelViewSet):
    queryset = News.objects.all()
    serializer_class = NewsSerializer
    permission_classes = [IsAdminUser]
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

class AdminEventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAdminUser]
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

class AdminGalleryViewSet(viewsets.ModelViewSet):
    queryset = Gallery.objects.all()
    serializer_class = GallerySerializer
    permission_classes = [IsAdminUser]
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

class AdminScheduleViewSet(viewsets.ModelViewSet):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer
    permission_classes = [IsAdminUser]

class AdminPrayerViewSet(viewsets.ModelViewSet):
    queryset = Prayer.objects.all()
    serializer_class = PrayerSerializer
    permission_classes = [IsAdminUser]

class AdminBannerSlideViewSet(viewsets.ModelViewSet):
    queryset = BannerSlide.objects.all()
    serializer_class = BannerSlideSerializer
    permission_classes = [IsAdminUser]
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

@api_view(['PATCH'])
@permission_classes([IsAdminUser])
def mark_message_read(request, message_id):
    """Mark contact message as read"""
    try:
        message = ContactMessage.objects.get(id=message_id)
        message.is_read = True
        message.save()
        return Response({'message': 'Message marked as read'})
    except ContactMessage.DoesNotExist:
        return Response({'error': 'Message not found'}, status=404)

@login_required
@user_passes_test(is_staff)
def admin_dashboard_view(request):
    """Render admin dashboard HTML"""
    from django.utils import timezone
    
    stats = {
        'unread_messages': ContactMessage.objects.filter(is_read=False).count(),
        'total_messages': ContactMessage.objects.count(),
        'prayer_requests': PrayerRequest.objects.count(),
        'published_news': News.objects.filter(is_published=True).count(),
        'upcoming_events': Event.objects.filter(date__gte=timezone.now()).count(),
        'gallery_items': Gallery.objects.count(),
    }
    
    dashboard_html = f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Church Admin Dashboard</title>
        <style>
            * {{ margin: 0; padding: 0; box-sizing: border-box; }}
            body {{ font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f8fafc; }}
            .header {{ background: linear-gradient(135deg, #0284c7, #0369a1); color: white; padding: 2rem; }}
            .container {{ max-width: 1200px; margin: 0 auto; padding: 2rem; }}
            .stats-grid {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-bottom: 2rem; }}
            .stat-card {{ background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border-left: 4px solid #0284c7; }}
            .stat-number {{ font-size: 2.5rem; font-weight: bold; color: #0284c7; margin-bottom: 0.5rem; }}
            .stat-label {{ color: #64748b; font-weight: 500; }}
            .sections {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2rem; }}
            .section {{ background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); overflow: hidden; }}
            .section-header {{ background: #f1f5f9; padding: 1.5rem; border-bottom: 1px solid #e2e8f0; }}
            .section-content {{ padding: 1.5rem; }}
            .btn {{ background: #0284c7; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 8px; text-decoration: none; display: inline-block; margin: 0.25rem; font-weight: 500; }}
            .btn:hover {{ background: #0369a1; }}
            .nav-links {{ background: white; padding: 1rem; margin-bottom: 2rem; border-radius: 12px; }}
            .nav-links a {{ color: #0284c7; text-decoration: none; margin-right: 2rem; font-weight: 500; }}
        </style>
    </head>
    <body>
        <div class="header">
            <div class="container">
                <h1>🏛️ Saint Mary Magdalene Church</h1>
                <p>Admin Dashboard - Manage your church content and community</p>
            </div>
        </div>

        <div class="container">
            <div class="nav-links">
                <a href="/admin/">Django Admin</a>
                <a href="/api/admin-dashboard/">Dashboard</a>
                <a href="http://localhost:5173/admin">Frontend Admin</a>
                <a href="/admin/logout/">Logout</a>
            </div>

            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-number">{stats['unread_messages']}</div>
                    <div class="stat-label">Unread Messages</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">{stats['prayer_requests']}</div>
                    <div class="stat-label">Prayer Requests</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">{stats['published_news']}</div>
                    <div class="stat-label">Published News</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">{stats['upcoming_events']}</div>
                    <div class="stat-label">Upcoming Events</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">{stats['gallery_items']}</div>
                    <div class="stat-label">Gallery Items</div>
                </div>
            </div>

            <div class="sections">
                <div class="section">
                    <div class="section-header">
                        <h3>📧 Contact Messages</h3>
                    </div>
                    <div class="section-content">
                        <a href="/admin/church_app/contactmessage/" class="btn">Manage Messages</a>
                        <a href="/api/admin/contact-messages/" class="btn">API View</a>
                    </div>
                </div>

                <div class="section">
                    <div class="section-header">
                        <h3>🙏 Prayer Requests</h3>
                    </div>
                    <div class="section-content">
                        <a href="/admin/church_app/prayerrequest/" class="btn">Manage Requests</a>
                        <a href="/api/admin/prayer-requests/" class="btn">API View</a>
                    </div>
                </div>

                <div class="section">
                    <div class="section-header">
                        <h3>📰 Content Management</h3>
                    </div>
                    <div class="section-content">
                        <a href="/admin/church_app/news/" class="btn">Manage News</a>
                        <a href="/admin/church_app/event/" class="btn">Manage Events</a>
                        <a href="/api/admin/news/" class="btn">News API</a>
                        <a href="/api/admin/events/" class="btn">Events API</a>
                    </div>
                </div>

                <div class="section">
                    <div class="section-header">
                        <h3>🎨 Media & Schedule</h3>
                    </div>
                    <div class="section-content">
                        <a href="/admin/church_app/gallery/" class="btn">Manage Gallery</a>
                        <a href="/admin/church_app/schedule/" class="btn">Manage Schedule</a>
                        <a href="/api/admin/gallery/" class="btn">Gallery API</a>
                    </div>
                </div>
            </div>
        </div>
    </body>
    </html>
    """
    
    return HttpResponse(dashboard_html)