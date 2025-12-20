from rest_framework import serializers
from .models import ContactMessage, PrayerRequest, News, Event, Gallery, Schedule, Prayer, BannerSlide

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
        fields = ['id', 'title', 'description', 'media_type', 'image', 'image_url', 'video_url', 'category', 'created_at', 'media_url']

    def get_media_url(self, obj):
        if obj.media_type == 'video':
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