from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from django.core.exceptions import ObjectDoesNotExist

from puzzles.models import UserSolvedPuzzles


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
@permission_classes([IsAuthenticated])
def getLeaderboardInfo(request):

    return Response({})