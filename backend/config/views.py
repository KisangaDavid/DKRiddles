from concurrent.futures import wait

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
from rest_framework.exceptions import Throttled

from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from allauth.headless import app_settings as headless_settings

from puzzles.models import UserSolvedPuzzles, User
from django.core.cache import cache
from .settings import LEADERBOARD_CACHE_KEY, CACHE_TIMEOUT 
from djoser.views import UserViewSet
from rest_framework.throttling import AnonRateThrottle, ScopedRateThrottle
from rest_framework_simplejwt.views import TokenObtainPairView
from better_profanity import profanity
from .settings import MIN_USERNAME_LENGTH, PENDING_USERNAME_PREFIX

class RegisterThrottle(ScopedRateThrottle):
    scope = "register"

    def get_cache_key(self, request, view):
        return getSessionBasedCacheKey(self, request)

    def allow_request(self, request, view):
        allowed = super().allow_request(request, view)
        if not allowed:
            wait = self.wait()
            minutes = int(wait) // 60 + 1
            unit = "minute" if minutes == 1 else "minutes"
            raise Throttled(detail=f"Too many account creation attempts! Try again in {minutes} {unit}.")
        return allowed

class ResetPasswordThrottle(ScopedRateThrottle):
    scope = "reset_password"

    def get_cache_key(self, request, view):
        return getSessionBasedCacheKey(self, request)

    def allow_request(self, request, view):
        allowed = super().allow_request(request, view)
        if not allowed:
            wait = self.wait()
            minutes = int(wait) // 60 + 1
            unit = "minute" if minutes == 1 else "minutes"
            raise Throttled(detail=f"Too many password reset attempts! Try again in {minutes} {unit}.")
        return allowed

class LoginThrottle(ScopedRateThrottle):
    scope = "log_in"

    def get_cache_key(self, request, view):
        return getSessionBasedCacheKey(self, request)

    def allow_request(self, request, view):
        allowed = super().allow_request(request, view)
        if not allowed:
            wait = self.wait()
            minutes = int(wait) // 60 + 1
            unit = "minute" if minutes == 1 else "minutes"
            raise Throttled(detail=f"Too many login attempts! Try again in {minutes} {unit}.")
        return allowed


class CustomUserViewSet(UserViewSet):
    # print(self.action)
    def get_throttles(self):
        if self.action == "create":
            self.throttle_scope = "register"
            return [RegisterThrottle()]
        if self.action == "reset_password":
            self.throttle_scope = "reset_password"
            return [ResetPasswordThrottle()]
        return super().get_throttles()
   
class ThrottledLoginView(TokenObtainPairView):
    throttle_scope = "log_in"
    throttle_classes = [LoginThrottle]

class LogoutView(APIView):
    permission_classes = (AllowAny,)
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_200_OK)
        except (ObjectDoesNotExist, TokenError):
            return Response(status=status.HTTP_400_BAD_REQUEST)

@ensure_csrf_cookie
def getCsrfToken(request):
    return JsonResponse({"detail": "CSRF cookie set"})

@api_view(['POST'])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def issueGoogleJwt(request):
    token_data = headless_settings.TOKEN_STRATEGY.create_access_token_payload(request)
    if not token_data or "refresh_token" not in token_data:
        return Response({"detail": "Could not create authentication tokens."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    return Response({
        "access": token_data["access_token"],
        "refresh": token_data["refresh_token"],
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getProfileInfo(request):
    solved = (
        UserSolvedPuzzles.objects
                .filter(user=request.user)
                .order_by('solvedTime')
    )
    username = request.user.username
    dateJoined = request.user.date_joined
    solvedDict = {entry.solvedPuzzle: entry.solvedTime for entry in solved}
    return Response({"username": username, "dateJoined": dateJoined, "solvedPuzzles": solvedDict})

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def setUsername(request):
    username = request.data.get("username", "")
    if not isinstance(username, str):
        return Response({"username": "Username is required."}, status=status.HTTP_400_BAD_REQUEST)

    username = username.strip()
    if len(username) < MIN_USERNAME_LENGTH:
        return Response(
            {"username": f"Username must be at least {MIN_USERNAME_LENGTH} characters long."},
            status=status.HTTP_400_BAD_REQUEST,
        )
    if profanity.contains_profanity(username):
        return Response(
            {"username": "Please choose a different username."},
            status=status.HTTP_400_BAD_REQUEST,
        )
    if User.objects.filter(username__iexact=username).exclude(pk=request.user.pk).exists():
        return Response(
            {"username": "An account with that username already exists."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    request.user.username = username
    request.user.save(update_fields=["username"])
    return Response({"username": username})

@api_view(['GET'])
def getLeaderboardInfo(request):
    def fetch_leaderboard():
        return (User.objects
                .filter(numPuzzlesSolved__gt=0)
                .order_by('-numPuzzlesSolved')[:10]
                .values('username', 'numPuzzlesSolved'))
    topUsers = cache.get_or_set(LEADERBOARD_CACHE_KEY, fetch_leaderboard, CACHE_TIMEOUT)
    return Response(list(topUsers))

def getSessionBasedCacheKey(self, request):
    if not request.session.session_key:
        request.session.create()
    ident = request.session.session_key
    print(f"request session sessionKey: {request.session.session_key}")
    return self.cache_format % {'scope': self.scope, 'ident': ident}