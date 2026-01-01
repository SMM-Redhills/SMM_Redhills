from rest_framework import serializers
from .models import ContactMessage, PrayerRequest, News, Event, Gallery, Schedule, Prayer, BannerSlide, ParishGroup, GroupActivity

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = '__all__'

class PrayerRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrayerRequest
        fields = '__all__'

class NewsSerializer(serializers.ModelSerializer):
    media_url = serializers.SerializerMethodField()
    class Meta:
        model = News
        fields = ['id', 'title', 'content', 'image', 'image_url', 'date', 'category', 'is_published', 'created_at', 'media_url']
    
    def get_media_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return obj.image_url

class EventSerializer(serializers.ModelSerializer):
    media_url = serializers.SerializerMethodField()
    class Meta:
        model = Event
        fields = ['id', 'title', 'description', 'date', 'location', 'image', 'image_url', 'created_at', 'media_url']
    
    def get_media_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return obj.image_url

class GallerySerializer(serializers.ModelSerializer):
    media_url = serializers.SerializerMethodField()

    class Meta:
        model = Gallery
        fields = ['id', 'title', 'description', 'media_type', 'image', 'image_url', 'video', 'video_url', 'category', 'created_at', 'media_url']

    def validate(self, data):
        """Validate file uploads based on media type"""
        media_type = data.get('media_type', 'image')
        
        # Validate video uploads
        if media_type == 'video':
            video_file = data.get('video')
            if video_file and hasattr(video_file, 'size'):
                # Max 100MB for videos
                max_size = 100 * 1024 * 1024  # 100MB in bytes
                if video_file.size > max_size:
                    raise serializers.ValidationError({
                        'video': f'Video file size cannot exceed 100MB. Current size: {video_file.size / (1024*1024):.2f}MB'
                    })
                
                # Validate video file type
                allowed_video_types = ['video/mp4', 'video/mpeg', 'video/quicktime', 'video/x-msvideo', 'video/webm']
                if hasattr(video_file, 'content_type') and video_file.content_type not in allowed_video_types:
                    raise serializers.ValidationError({
                        'video': f'Invalid video format. Allowed formats: MP4, MPEG, MOV, AVI, WebM'
                    })
        
        # Validate image uploads
        elif media_type == 'image':
            image_file = data.get('image')
            if image_file and hasattr(image_file, 'size'):
                # Max 10MB for images
                max_size = 10 * 1024 * 1024  # 10MB in bytes
                if image_file.size > max_size:
                    raise serializers.ValidationError({
                        'image': f'Image file size cannot exceed 10MB. Current size: {image_file.size / (1024*1024):.2f}MB'
                    })
        
        return data

    def get_media_url(self, obj):
        if obj.media_type == 'video':
            if obj.video:
                request = self.context.get('request')
                if request:
                    return request.build_absolute_uri(obj.video.url)
                return obj.video.url
            return obj.video_url
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return obj.image_url

class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = '__all__'

class PrayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prayer
        fields = '__all__'

class BannerSlideSerializer(serializers.ModelSerializer):
    media_url = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = BannerSlide
        fields = ['id', 'title', 'subtitle', 'description', 'image', 'image_url', 'order', 'is_active', 'created_at', 'media_url']
        read_only_fields = ['id', 'created_at', 'media_url']
    
    def get_media_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return obj.image_url

class GroupActivitySerializer(serializers.ModelSerializer):
    media_url = serializers.SerializerMethodField()
    class Meta:
        model = GroupActivity
        fields = ['id', 'group', 'title', 'description', 'image', 'date', 'media_url']
    
    def get_media_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None

class ParishGroupSerializer(serializers.ModelSerializer):
    activities = GroupActivitySerializer(many=True, read_only=True)
    class Meta:
        model = ParishGroup
        fields = ['id', 'name', 'description', 'logo', 'activities']