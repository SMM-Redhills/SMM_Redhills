"""
Security configuration and utilities for SMM Redhills Church Backend
"""

import re
from django.core.exceptions import ValidationError
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

class SecurityValidator:
    """
    Security validation utilities
    """
    
    # Malicious patterns to detect
    XSS_PATTERNS = [
        r'<script[^>]*>.*?</script>',
        r'javascript:',
        r'on\w+\s*=',
        r'eval\s*\(',
        r'alert\s*\(',
        r'document\.cookie',
        r'window\.location',
        r'<iframe[^>]*>',
        r'<object[^>]*>',
        r'<embed[^>]*>',
    ]
    
    SQL_INJECTION_PATTERNS = [
        r'(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|TRUNCATE|EXEC|UNION)\b)',
        r'(--|#|/\*|\*/)',
        r'(\b(OR|AND)\b\s+\d+\s*=\s*\d+)',
        r'(\b(OR|AND)\b\s+\'\w+\'\s*=\s*\'\w+\')',
        r'(xp_|sp_)',
        r'(\bFROM\b\s+\w+)',
        r'(\bWHERE\b)',
    ]
    
    FILE_UPLOAD_PATTERNS = [
        r'\.php',
        r'\.jsp',
        r'\.asp',
        r'\.exe',
        r'\.bat',
        r'\.cmd',
        r'\.sh',
        r'\.scr',
        r'\.pif',
        r'\.com',
    ]
    
    @classmethod
    def validate_xss(cls, value):
        """Check for XSS patterns in input"""
        if not value:
            return value
            
        for pattern in cls.XSS_PATTERNS:
            if re.search(pattern, value, re.IGNORECASE):
                logger.warning(f"XSS attempt detected: {pattern} in {value[:100]}")
                raise ValidationError("Invalid content detected. Please remove any scripts or HTML tags.")
        return value
    
    @classmethod
    def validate_sql_injection(cls, value):
        """Check for SQL injection patterns"""
        if not value:
            return value
            
        for pattern in cls.SQL_INJECTION_PATTERNS:
            if re.search(pattern, value, re.IGNORECASE):
                logger.warning(f"SQL injection attempt detected: {pattern} in {value[:100]}")
                raise ValidationError("Invalid content detected. Please use only valid characters.")
        return value
    
    @classmethod
    def validate_file_upload(cls, filename):
        """Check for dangerous file extensions"""
        if not filename:
            return filename
            
        for pattern in cls.FILE_UPLOAD_PATTERNS:
            if re.search(pattern, filename, re.IGNORECASE):
                logger.warning(f"Dangerous file upload attempt: {filename}")
                raise ValidationError("This file type is not allowed.")
        return filename
    
    @classmethod
    def validate_content_length(cls, value, min_length=1, max_length=10000):
        """Validate content length"""
        if len(value) < min_length or len(value) > max_length:
            raise ValidationError(f"Content must be between {min_length} and {max_length} characters.")
        return value
    
    @classmethod
    def validate_email(cls, email):
        """Enhanced email validation"""
        email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_pattern, email):
            raise ValidationError("Please enter a valid email address.")
        return email.lower().strip()

class SecurityHeaders:
    """
    Security headers configuration
    """
    
    HEADERS = {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'geolocation=(), microphone=(), camera=(), payment=(), usb=()',
        'Content-Security-Policy': (
            "default-src 'self'; "
            "script-src 'self' 'unsafe-inline' 'unsafe-eval'; "
            "style-src 'self' 'unsafe-inline'; "
            "img-src 'self' data: https:; "
            "font-src 'self'; "
            "connect-src 'self'; "
            "frame-ancestors 'none';"
        ),
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    }
    
    @classmethod
    def add_headers(cls, response):
        """Add security headers to response"""
        for header, value in cls.HEADERS.items():
            response[header] = value
        
        # Remove server information
        response.pop('Server', None)
        
        return response

def get_client_ip(request):
    """Get client IP address from request"""
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0].strip()
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip

def log_security_event(event_type, details, request=None):
    """Log security events"""
    ip_address = get_client_ip(request) if request else 'unknown'
    user_agent = request.META.get('HTTP_USER_AGENT', 'unknown') if request else 'unknown'
    
    logger.warning(
        f"SECURITY EVENT: {event_type} | IP: {ip_address} | "
        f"User-Agent: {user_agent} | Details: {details}"
    )
