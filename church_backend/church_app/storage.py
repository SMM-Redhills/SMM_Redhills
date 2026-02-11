import os
from django.core.files.storage import FileSystemStorage
from cloudinary_storage.storage import MediaCloudinaryStorage, RawMediaCloudinaryStorage
from django.conf import settings
import cloudinary
import cloudinary.uploader

class VideoCloudinaryStorage(RawMediaCloudinaryStorage):
    """
    Custom storage for video files using Cloudinary's raw upload
    """
    def get_upload_options(self, file):
        """
        Set video-specific upload options for Cloudinary
        """
        upload_options = {
            'resource_type': 'video',
            'format': 'mp4',
            'quality': 'auto',
            'folder': 'gallery_videos',
        }
        return upload_options
    
    def _save(self, name, content):
        """
        Override save method to ensure video resource type
        """
        try:
            # Upload using cloudinary uploader with video resource type
            result = cloudinary.uploader.upload(
                content,
                resource_type='video',
                folder='gallery_videos',
                public_id=name.split('/')[-1].split('.')[0],
                format='mp4'
            )
            return result['public_id']
        except Exception as e:
            # Fallback to parent method
            return super()._save(name, content)

class HybridCloudinaryStorage:
    """
    Storage class that routes files to appropriate Cloudinary storage
    based on file type
    """
    
    def __init__(self, *args, **kwargs):
        self.image_storage = MediaCloudinaryStorage()
        self.video_storage = VideoCloudinaryStorage()
        self.fallback_storage = FileSystemStorage()
    
    def _get_storage_for_file(self, name, content=None):
        """
        Determine which storage to use based on file extension or content type
        """
        # Check file extension
        file_ext = os.path.splitext(name)[1].lower()
        video_extensions = ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.webm', '.mkv', '.m4v']
        
        if file_ext in video_extensions:
            return self.video_storage
        
        # Check content type if available
        if hasattr(content, 'content_type'):
            content_type = content.content_type.lower()
            if content_type.startswith('video/'):
                return self.video_storage
        
        # Default to image storage
        return self.image_storage
    
    def save(self, name, content, max_length=None):
        """
        Save file using appropriate storage backend
        """
        storage = self._get_storage_for_file(name, content)
        return storage.save(name, content, max_length)
    
    def open(self, name, mode='rb'):
        """
        Open file from appropriate storage
        """
        storage = self._get_storage_for_file(name)
        return storage.open(name, mode)
    
    def delete(self, name):
        """
        Delete file from appropriate storage
        """
        storage = self._get_storage_for_file(name)
        return storage.delete(name)
    
    def exists(self, name):
        """
        Check if file exists in appropriate storage
        """
        storage = self._get_storage_for_file(name)
        return storage.exists(name)
    
    def url(self, name):
        """
        Get URL for file from appropriate storage
        """
        storage = self._get_storage_for_file(name)
        return storage.url(name)
    
    def size(self, name):
        """
        Get file size from appropriate storage
        """
        storage = self._get_storage_for_file(name)
        return storage.size(name)
