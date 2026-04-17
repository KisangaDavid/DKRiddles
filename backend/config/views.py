from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from django.core.exceptions import ObjectDoesNotExist

from puzzles.models import UserSolvedPuzzles, User
from django.core.cache import cache
from .settings import LEADERBOARD_CACHE_KEY, CACHE_TIMEOUT 

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

@api_view(['GET'])
def getLeaderboardInfo(request):
    def fetch_leaderboard():
        return (User.objects
                .order_by('-numPuzzlesSolved')[:10]
                .values('username', 'numPuzzlesSolved'))

    topUsers = cache.get_or_set(LEADERBOARD_CACHE_KEY, fetch_leaderboard, CACHE_TIMEOUT)
    return Response(list(topUsers))