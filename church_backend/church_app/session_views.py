from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods
from django.contrib.auth import logout
from django.utils import timezone
import time

@require_http_methods(["GET"])
@login_required
def session_status(request):
    """
    Check the current session status and remaining time
    """
    if not request.user.is_staff:
        return JsonResponse({'error': 'Unauthorized'}, status=403)
    
    # Get session start time and last activity
    session_start = request.session.get('admin_session_start', time.time())
    last_activity = request.session.get('admin_last_activity', time.time())
    
    # Calculate remaining time
    from django.conf import settings
    session_timeout = getattr(settings, 'ADMIN_SESSION_TIMEOUT', 3600)
    elapsed = time.time() - last_activity
    remaining = max(0, session_timeout - elapsed)
    
    return JsonResponse({
        'session_active': True,
        'session_start': session_start,
        'last_activity': last_activity,
        'session_remaining': remaining,
        'session_timeout': session_timeout
    })

@require_http_methods(["POST"])
@login_required
def extend_session(request):
    """
    Extend the current admin session
    """
    if not request.user.is_staff:
        return JsonResponse({'error': 'Unauthorized'}, status=403)
    
    # Update last activity time
    request.session['admin_last_activity'] = time.time()
    
    # Extend session expiry
    from django.conf import settings
    session_timeout = getattr(settings, 'ADMIN_SESSION_TIMEOUT', 3600)
    request.session.set_expiry(session_timeout)
    
    return JsonResponse({
        'message': 'Session extended successfully',
        'session_extended_until': time.time() + session_timeout,
        'session_timeout': session_timeout
    })

@require_http_methods(["POST"])
@login_required
def logout_admin(request):
    """
    Logout admin user and clear session
    """
    if not request.user.is_staff:
        return JsonResponse({'error': 'Unauthorized'}, status=403)
    
    logout(request)
    return JsonResponse({
        'message': 'Logged out successfully'
    })
