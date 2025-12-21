from django.db import models
from django.contrib.auth.models import User

class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} - {self.subject}"

class PrayerRequest(models.Model):
    PRAYER_TYPES = [
        ('health', 'Health & Healing'),
        ('family', 'Family & Relationships'),
        ('finance', 'Financial Blessing'),
        ('career', 'Career & Education'),
        ('spiritual', 'Spiritual Growth'),
        ('thanksgiving', 'Thanksgiving'),
        ('other', 'Other'),
    ]

    name = models.CharField(max_length=100)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=20, blank=True)
    prayer_type = models.CharField(max_length=20, choices=PRAYER_TYPES)
    intention = models.TextField()
    is_public = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} - {self.get_prayer_type_display()}"

class News(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    image = models.ImageField(upload_to='news/', blank=True, null=True)
    image_url = models.URLField(max_length=500, blank=True, null=True)
    date = models.DateField()
    category = models.CharField(max_length=50, default='General')
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date']

    def __str__(self):
        return self.title

class Event(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    date = models.DateTimeField()
    location = models.CharField(max_length=200, default="Main Church")
    image = models.ImageField(upload_to='events/', blank=True, null=True)
    image_url = models.URLField(max_length=500, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['date']

    def __str__(self):
        return self.title

class Gallery(models.Model):
    MEDIA_TYPES = [
        ('image', 'Image'),
        ('video', 'Video'),
    ]
    
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    media_type = models.CharField(max_length=10, choices=MEDIA_TYPES, default='image')
    image = models.ImageField(upload_to='gallery/', blank=True, null=True)
    image_url = models.URLField(max_length=500, blank=True, null=True)
    video = models.FileField(upload_to='gallery_videos/', blank=True, null=True)
    video_url = models.URLField(max_length=500, blank=True, null=True)
    category = models.CharField(max_length=50, default='General')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title

class Schedule(models.Model):
    DAYS_OF_WEEK = [
        ('monday', 'Monday'),
        ('tuesday', 'Tuesday'),
        ('wednesday', 'Wednesday'),
        ('thursday', 'Thursday'),
        ('friday', 'Friday'),
        ('saturday', 'Saturday'),
        ('sunday', 'Sunday'),
        ('daily', 'Daily'),
    ]
    
    title = models.CharField(max_length=100)
    day = models.CharField(max_length=10, choices=DAYS_OF_WEEK)
    time = models.TimeField()
    description = models.TextField(blank=True)
    location = models.CharField(max_length=100, default="Main Church")

    class Meta:
        ordering = ['day', 'time']

    def __str__(self):
        return f"{self.title} - {self.get_day_display()} {self.time}"

# church_app/models.py
class Prayer(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    category = models.CharField(max_length=100)
    language = models.CharField(max_length=20, default='english')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title
class BannerSlide(models.Model):
    title = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=300, blank=True)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='banners/', blank=True, null=True)
    image_url = models.URLField(max_length=500, blank=True, null=True)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-created_at']

    def __str__(self):
        return self.title

class ParishGroup(models.Model):
    GROUP_CHOICES = [
        ('youth', 'Youth Group'),
        ('vincent', 'Vincent de Paul'),
        ('legion', 'Legion of Mary'),
        ('joseph', 'St. Joseph Group'),
    ]
    name = models.CharField(max_length=50, choices=GROUP_CHOICES, unique=True)
    description = models.TextField(blank=True, help_text="Leave blank to use default static content")
    logo = models.ImageField(upload_to='group_logos/', blank=True, null=True)
    
    def __str__(self):
        return self.get_name_display()

class GroupActivity(models.Model):
    group = models.ForeignKey(ParishGroup, on_delete=models.CASCADE, related_name='activities')
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='group_activities/', blank=True, null=True)
    date = models.DateField()

    class Meta:
        ordering = ['-date']

    def __str__(self):
        return f"{self.group} - {self.title}"