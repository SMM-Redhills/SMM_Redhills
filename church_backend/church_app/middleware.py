import time
from django.http import HttpResponse
from django.core.cache import cache
from django.conf import settings
import logging

logger = logging.getLogger(__name__)


class SecurityHeadersMiddleware:
    """
    Middleware to add security headers to all responses
    """
    
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        
        # Add security headers
        response['X-Content-Type-Options'] = 'nosniff'
        response['X-Frame-Options'] = 'DENY'
        response['X-XSS-Protection'] = '1; mode=block'
        response['Referrer-Policy'] = 'strict-origin-when-cross-origin'
        response['Permissions-Policy'] = 'geolocation=(), microphone=(), camera=()'
        
        # Remove server information
        response.pop('Server', None)
        
        return response


class RateLimitMiddleware:
    """
    Custom rate limiting middleware for API endpoints (simplified version)
    """
    
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Apply stricter rate limiting to authentication endpoints
        if request.path.startswith('/api/auth/') or request.path.startswith('/api/admin/'):
            client_ip = self.get_client_ip(request)
            cache_key = f"rate_limit_{client_ip}_{request.path}"
            
            # Get current count
            count = cache.get(cache_key, 0)
            
            # Limit to 10 requests per minute for auth endpoints
            if count >= 10:
                return HttpResponse(
                    '{"error": "Rate limit exceeded. Please try again later."}',
                    content_type="application/json",
                    status=429
                )
            
            # Increment counter
            cache.set(cache_key, count + 1, 60)  # 1 minute expiry
        
        return self.get_response(request)
    
    def get_client_ip(self, request):
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip


class RequestLoggingMiddleware:
    """
    Middleware to log suspicious requests
    """
    
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        start_time = time.time()
        
        # Log suspicious patterns
        suspicious_patterns = [
            '../',
            '<script',
            'javascript:',
            'SELECT * FROM',
            'UNION SELECT',
            'DROP TABLE',
            'INSERT INTO',
            'DELETE FROM',
            'UPDATE SET',
        ]
        
        request_body = getattr(request, 'body', b'').decode('utf-8', errors='ignore')
        request_url = request.get_full_path()
        
        for pattern in suspicious_patterns:
            if pattern.lower() in request_body.lower() or pattern.lower() in request_url.lower():
                # Log suspicious request
                print(f"SUSPICIOUS REQUEST: {request.method} {request_url} from {self.get_client_ip(request)}")
                break
        
        response = self.get_response(request)
        
        # Log slow requests
        duration = time.time() - start_time
        if duration > 5:  # Requests taking more than 5 seconds
            print(f"SLOW REQUEST: {request.method} {request_url} took {duration:.2f}s")
        
        return response
    
    def get_client_ip(self, request):
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip
