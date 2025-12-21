from django.contrib import admin
from .models import ContactMessage, PrayerRequest, News, Event, Gallery, Schedule, Prayer, BannerSlide, ParishGroup, GroupActivity

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject', 'created_at', 'is_read']
    list_filter = ['is_read', 'created_at']
    search_fields = ['name', 'email', 'subject']
    list_editable = ['is_read']
    readonly_fields = ['created_at']

@admin.register(PrayerRequest)
class PrayerRequestAdmin(admin.ModelAdmin):
    list_display = ['name', 'prayer_type', 'is_public', 'created_at']
    list_filter = ['prayer_type', 'is_public', 'created_at']
    search_fields = ['name', 'email', 'intention']
    readonly_fields = ['created_at']

@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'date', 'is_published', 'created_at']
    list_filter = ['category', 'is_published', 'date']
    search_fields = ['title', 'content']
    list_editable = ['is_published']

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ['title', 'date', 'location', 'created_at']
    list_filter = ['date', 'location']
    search_fields = ['title', 'description']

@admin.register(Gallery)
class GalleryAdmin(admin.ModelAdmin):
    list_display = ['title', 'media_type', 'category', 'created_at']
    list_filter = ['media_type', 'category', 'created_at']
    search_fields = ['title', 'description']

@admin.register(Schedule)
class ScheduleAdmin(admin.ModelAdmin):
    list_display = ['title', 'day', 'time', 'location']
    list_filter = ['day', 'location']
    search_fields = ['title', 'description']

@admin.register(Prayer)
class PrayerAdmin(admin.ModelAdmin):
    list_display = ['title', 'language', 'category', 'created_at']
    list_filter = ['language', 'category']
    search_fields = ['title', 'content']

@admin.register(BannerSlide)
class BannerSlideAdmin(admin.ModelAdmin):
    list_display = ['title', 'order', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['title', 'subtitle']
    list_editable = ['order', 'is_active']

class GroupActivityInline(admin.StackedInline):
    model = GroupActivity
    extra = 1

@admin.register(ParishGroup)
class ParishGroupAdmin(admin.ModelAdmin):
    list_display = ['name']
    inlines = [GroupActivityInline]

@admin.register(GroupActivity)
class GroupActivityAdmin(admin.ModelAdmin):
    list_display = ['title', 'group', 'date']
    list_filter = ['group', 'date']
    search_fields = ['title', 'description']

# Customize admin site
admin.site.site_header = "Saint Mary Magdalene Church Admin"
admin.site.site_title = "Church Admin"
admin.site.index_title = "Welcome to Church Administration"