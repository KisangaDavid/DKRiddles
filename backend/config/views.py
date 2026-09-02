from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
from django.urls import resolve

from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from allauth.headless import app_settings as headless_settings
from puzzles.models import UserSolvedPuzzles, User
from django.core.cache import cache
from .settings import LEADERBOARD_CACHE_KEY, CACHE_TIMEOUT 
from better_profanity import profanity
from .settings import MIN_USERNAME_LENGTH, PENDING_USERNAME_PREFIX, MAX_USERNAME_LENGTH

@ensure_csrf_cookie
def getCsrfToken(request):
    return JsonResponse({"detail": "CSRF cookie set"})

@api_view(['POST'])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def setUpConn(request):
    pfp_url = request.user.pfp_url
    print(f"pfp_url within setUpConn: {pfp_url}")
    token_data = headless_settings.TOKEN_STRATEGY.create_access_token_payload(request)
    if not token_data or "refresh_token" not in token_data:
        return Response({"detail": "Could not create authentication tokens."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    return Response({
        "access": token_data["access_token"],
        "refresh": token_data["refresh_token"],
        "pfp_url": pfp_url
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
    userPfpLink = request.user.pfp_url
    solvedDict = {entry.solvedPuzzle: entry.solvedTime for entry in solved}
    return Response({"username": username, "dateJoined": dateJoined, "solvedPuzzles": solvedDict, "userPfpLink": userPfpLink})

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def setUsername(request):
    print(request.user)
    newUsername = request.data.get("username", "")
    newUsername = newUsername.strip()
    if not request.user.username.startswith(PENDING_USERNAME_PREFIX):
        return Response({"username": f"Your username has already been set to {request.user.username}."}, status=status.HTTP_400_BAD_REQUEST)
    if not newUsername.isalnum():
        return Response({"username": "Username must be alphanumeric with no spaces."}, status=status.HTTP_400_BAD_REQUEST)
    if len(newUsername) < MIN_USERNAME_LENGTH:
        return Response(
            {"username": f"Username must be at least {MIN_USERNAME_LENGTH} characters long."},
            status=status.HTTP_400_BAD_REQUEST,
        )
    if len(newUsername) >= MAX_USERNAME_LENGTH:
        return Response(
            {"username": f"Username must be less than 20 characters long."},
            status=status.HTTP_400_BAD_REQUEST,
        )
    if profanity.contains_profanity(newUsername):
        return Response(
            {"username": "Please choose a different username."},
            status=status.HTTP_400_BAD_REQUEST,
        )
    if User.objects.filter(username__iexact=newUsername).exclude(pk=request.user.pk).exists():
        return Response(
            {"username": "An account with that username already exists."},
            status=status.HTTP_400_BAD_REQUEST,
        )
    request.user.username = newUsername
    request.user.save(update_fields=["username"])
    print(f"request.user.numPuzzlesSolved: {request.user.numPuzzlesSolved}")
    if request.user.numPuzzlesSolved > 0:
        cache.delete(LEADERBOARD_CACHE_KEY)
    return Response({"username": newUsername})

@api_view(['GET'])
def getLeaderboardInfo(request):
    def fetch_leaderboard():
        return (User.objects
                .filter(numPuzzlesSolved__gt=0,)
                .exclude(username__startswith=PENDING_USERNAME_PREFIX)
                .order_by('-numPuzzlesSolved')[:10]
                .values('username', 'numPuzzlesSolved'))
    topUsers = cache.get_or_set(LEADERBOARD_CACHE_KEY, fetch_leaderboard, CACHE_TIMEOUT)
    return Response(list(topUsers))
