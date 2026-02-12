from rest_framework import serializers
from django.core.exceptions import ValidationError
from django.utils.html import escape
import bleach
from .models import ContactMessage, PrayerRequest, News, Gallery, Schedule, Prayer, BannerSlide, ParishGroup, GroupActivity

# Sanitize HTML content
def sanitize_html(content):
    """
    Sanitize HTML content to prevent XSS attacks
    """
    if not content:
        return content
    
    # Allow basic HTML tags for content formatting
    allowed_tags = ['p', 'br', 'strong', 'em', 'u', 'ol', 'ul', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']
    allowed_attributes = {'*': ['class']}
    
    # Clean the HTML
    clean_content = bleach.clean(content, tags=allowed_tags, attributes=allowed_attributes, strip=True)
    return clean_content

def validate_no_sql_injection(value):
    """
    Basic SQL injection validation
    """
    sql_patterns = [
        'SELECT', 'INSERT', 'UPDATE', 'DELETE', 'DROP', 'UNION', 'FROM', 'WHERE',
        'EXEC', 'ALTER', 'CREATE', 'TRUNCATE', '--', '/*', '*/', 'xp_', 'sp_'
    ]
    
    upper_value = value.upper()
    for pattern in sql_patterns:
        if pattern in upper_value:
            raise ValidationError(f"Potentially dangerous content detected: {pattern}")
    
    return value

class ContactMessageSerializer(serializers.ModelSerializer):
    def validate_name(self, value):
        # Sanitize and validate name
        value = escape(value.strip())
        validate_no_sql_injection(value)
        if len(value) < 2 or len(value) > 100:
            raise ValidationError("Name must be between 2 and 100 characters.")
        return value
    
    def validate_email(self, value):
        # Basic email validation
        value = value.strip().lower()
        if '@' not in value or '.' not in value:
            raise ValidationError("Please enter a valid email address.")
        return value
    
    def validate_subject(self, value):
        # Sanitize and validate subject
        value = escape(value.strip())
        validate_no_sql_injection(value)
        if len(value) < 2 or len(value) > 200:
            raise ValidationError("Subject must be between 2 and 200 characters.")
        return value
    
    def validate_message(self, value):
        # Sanitize message content
        value = sanitize_html(value.strip())
        validate_no_sql_injection(value)
        if len(value) < 10 or len(value) > 2000:
            raise ValidationError("Message must be between 10 and 2000 characters.")
        return value
    
    class Meta:
        model = ContactMessage
        fields = '__all__'

class PrayerRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrayerRequest
        fields = '__all__'

class NewsSerializer(serializers.ModelSerializer):
    media_url = serializers.SerializerMethodField()
    content_type_display = serializers.CharField(source='get_content_type_display', read_only=True)
    
    class Meta:
        model = News
        fields = ['id', 'title', 'content', 'description', 'image', 'image_url', 'date', 'time', 'location', 'content_type', 'content_type_display', 'category', 'is_published', 'created_at', 'media_url']
    
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
                    video_url = request.build_absolute_uri(obj.video.url)
                else:
                    video_url = obj.video.url
                
                # Check if it's a Cloudinary URL and ensure it's properly formatted for video
                if 'cloudinary' in video_url:
                    # For Cloudinary videos, we need to ensure proper format
                    if not video_url.endswith('.mp4'):
                        # Add .mp4 extension if not present
                        if '?' in video_url:
                            video_url = video_url.replace('?', '.mp4?')
                        else:
                            video_url = video_url + '.mp4'
                
                return video_url
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