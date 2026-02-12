import time
from django.http import JsonResponse
from django.conf import settings
from django.contrib.auth.middleware import get_user
from django.utils import timezone

class AdminSessionMiddleware:
    """
    Middleware to handle admin session timeout and extend sessions
    """
    
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Check if this is an admin request
        if request.path.startswith('/admin/') or request.path.startswith('/api/admin/'):
            user = get_user(request)
            
            if user.is_authenticated and user.is_staff:
                # Get or set session start time
                session_start = request.session.get('admin_session_start')
                
                if not session_start:
                    # Set initial session start time
                    request.session['admin_session_start'] = time.time()
                    request.session['admin_last_activity'] = time.time()
                else:
                    # Check if session has expired
                    current_time = time.time()
                    session_duration = current_time - session_start
                    
                    # Check for inactivity timeout (1 hour)
                    last_activity = request.session.get('admin_last_activity', session_start)
                    inactivity_duration = current_time - last_activity
                    
                    if inactivity_duration > getattr(settings, 'ADMIN_SESSION_TIMEOUT', 3600):
                        # Session expired due to inactivity
                        from django.contrib.auth import logout
                        logout(request)
                        
                        if request.path.startswith('/api/'):
                            return JsonResponse({
                                'error': 'Session expired due to inactivity',
                                'message': 'Please log in again',
                                'session_expired': True
                            }, status=401)
                        else:
                            # For web admin, redirect to login
                            from django.shortcuts import redirect
                            return redirect('/admin/login/?next=' + request.path)
                    
                    # Update last activity time
                    request.session['admin_last_activity'] = current_time
                    
                    # Extend session if needed
                    if hasattr(request, 'session') and request.session.session_key:
                        request.session.set_expiry(getattr(settings, 'ADMIN_SESSION_TIMEOUT', 3600))
        
        response = self.get_response(request)
        
        # Add session timeout info to response headers for admin requests
        if request.path.startswith('/api/admin/') and hasattr(request, 'user') and request.user.is_authenticated:
            response['X-Admin-Session-Timeout'] = str(getattr(settings, 'ADMIN_SESSION_TIMEOUT', 3600))
            response['X-Admin-Session-Remaining'] = str(
                getattr(settings, 'ADMIN_SESSION_TIMEOUT', 3600) - 
                (time.time() - request.session.get('admin_last_activity', time.time()))
            )
        
        return response
