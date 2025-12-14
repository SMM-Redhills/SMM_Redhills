from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User

@api_view(['POST'])
@permission_classes([AllowAny])
def admin_login(request):
    """Simple admin login endpoint"""
    username = request.data.get('username')
    password = request.data.get('password')
    
    if not username or not password:
        return Response({
            'error': 'Username and password required'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    user = authenticate(username=username, password=password)
    
    if user and user.is_staff:
        # Check if authtoken app is installed and tables exist
        try:
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'is_staff': user.is_staff,
                }
            })
        except Exception as e:
            print(f"Token creation error: {e}")
            return Response({'error': 'Token system error. Did you run migrations?'}, status=500)
    
    return Response({
        'error': 'Invalid credentials or insufficient permissions'
    }, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def admin_logout(request):
    """Simple logout endpoint"""
    if request.user.is_authenticated:
        try:
            # Delete the token to force logout
            request.user.auth_token.delete()
        except Exception:
            pass
    return Response({'message': 'Successfully logged out'})

@api_view(['GET'])
def admin_profile(request):
    """Get current admin user profile"""
    if request.user.is_authenticated and request.user.is_staff:
        return Response({
            'user': {
                'id': request.user.id,
                'username': request.user.username,
                'email': request.user.email,
                'is_staff': request.user.is_staff,
            }
        })
    return Response({'error': 'Not authenticated'}, status=401)