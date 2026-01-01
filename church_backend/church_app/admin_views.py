from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from django.contrib.auth.decorators import login_required, user_passes_test
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.utils import timezone
from .models import ContactMessage, PrayerRequest, News, Event, Gallery, Schedule, Prayer, BannerSlide, ParishGroup, GroupActivity
from .serializers import (
    ContactMessageSerializer, PrayerRequestSerializer, NewsSerializer, 
    EventSerializer, GallerySerializer, ScheduleSerializer, PrayerSerializer, BannerSlideSerializer,
    ParishGroupSerializer, GroupActivitySerializer
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
    
    def create(self, request, *args, **kwargs):
        """Override create to add better error handling for file uploads"""
        try:
            # Log the incoming data for debugging
            print(f"Gallery upload - Media Type: {request.data.get('media_type')}")
            if 'video' in request.FILES:
                video_file = request.FILES['video']
                print(f"Video file: {video_file.name}, Size: {video_file.size / (1024*1024):.2f}MB")
            if 'image' in request.FILES:
                image_file = request.FILES['image']
                print(f"Image file: {image_file.name}, Size: {image_file.size / (1024*1024):.2f}MB")
            
            return super().create(request, *args, **kwargs)
        except Exception as e:
            print(f"Error creating gallery item: {str(e)}")
            return Response(
                {'error': str(e), 'detail': 'Failed to upload media file'},
                status=status.HTTP_400_BAD_REQUEST
            )
    
    def update(self, request, *args, **kwargs):
        """Override update to add better error handling for file uploads"""
        try:
            return super().update(request, *args, **kwargs)
        except Exception as e:
            print(f"Error updating gallery item: {str(e)}")
            return Response(
                {'error': str(e), 'detail': 'Failed to update media file'},
                status=status.HTTP_400_BAD_REQUEST
            )

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

class AdminParishGroupViewSet(viewsets.ModelViewSet):
    queryset = ParishGroup.objects.all()
    serializer_class = ParishGroupSerializer
    permission_classes = [IsAdminUser]

class AdminGroupActivityViewSet(viewsets.ModelViewSet):
    queryset = GroupActivity.objects.all()
    serializer_class = GroupActivitySerializer
    permission_classes = [IsAdminUser]
    parser_classes = [MultiPartParser, FormParser, JSONParser]

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
    """Render admin dashboard using Django template"""
    from django.utils import timezone
    
    stats = {
        'unread_messages': ContactMessage.objects.filter(is_read=False).count(),
        'total_messages': ContactMessage.objects.count(),
        'prayer_requests': PrayerRequest.objects.count(),
        'published_news': News.objects.filter(is_published=True).count(),
        'upcoming_events': Event.objects.filter(date__gte=timezone.now()).count(),
        'gallery_items': Gallery.objects.count(),
    }
    
    return render(request, 'admin/dashboard.html', {'stats': stats})