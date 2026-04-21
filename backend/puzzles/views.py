import ctypes 

from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt

from puzzles.serializers import CheckHorseRiddleAnswerSerializer, CheckRabbitRiddleBonusAnswerSerializer, CheckRatRiddleAnswerSerializer, RaceHorsesSerializer, CheckRatRiddleBonusAnswerSerializer, SingleIntSerializer
from puzzles.models import UserSolvedPuzzles, PuzzleNames
from puzzles.soFile import allModules
from django.core.cache import cache
from config.settings import RABBIT_RIDDLE_BASE_NUM_RABBITS, HORSE_PUZZLE_MIN_RACES, LEADERBOARD_CACHE_KEY

@api_view(['POST'])
def checkRatRiddleAnswer(request):
    data = deserialize_request(request, CheckRatRiddleAnswerSerializer)
    result = allModules.checkRatRiddleAnswer(data["submittedPlan"])
    if result == -1 and request.user.is_authenticated:
        updateSolvedPuzzle(request.user, PuzzleNames.RAT_PUZZLE_P1)
    return Response(result)

@api_view(['POST'])
def checkRatRiddleBonusAnswer(request):
    data = deserialize_request(request, CheckRatRiddleBonusAnswerSerializer)
    result = allModules.checkRatRiddleBonusAnswer(
        data["numHouses"],
        data["answerToBonus"]
    )
    if result and request.user.is_authenticated:
        updateSolvedPuzzle(request.user, PuzzleNames.RAT_PUZZLE_P2)
    return Response({"result": "success" if result else "fail"})

@api_view(['POST'])
def checkHorseRiddleAnswer(request):
    data = deserialize_request(request, CheckHorseRiddleAnswerSerializer)
    submittedRaces = (ctypes.c_uint32 * data["numRaces"])(*data["submittedRaces"])
    result = allModules.checkHorseRiddleAnswer(
        data["randSeed"],
        data["fastestHorsesInt"],
        submittedRaces,
        data["numRaces"]
    )
    if result == 0 and data["numRaces"] == HORSE_PUZZLE_MIN_RACES and request.user.is_authenticated:
        updateSolvedPuzzle(request.user, PuzzleNames.HORSE_PUZZLE_P1)
    return Response(result)

@api_view(['POST'])
def checkRabbitRiddleAnswer(request):
    data = deserialize_request(request, SingleIntSerializer)
    result = allModules.checkRabbitRiddleBonusAnswer(
        RABBIT_RIDDLE_BASE_NUM_RABBITS,
        data["submittedInt"]
    )
    if result and request.user.is_authenticated:
        updateSolvedPuzzle(request.user, PuzzleNames.RABBIT_PUZZLE_P1)
    return Response({"result": "success" if result else "fail"})

@api_view(['POST'])
def checkRabbitRiddleBonusAnswer(request):
    data = deserialize_request(request, CheckRabbitRiddleBonusAnswerSerializer)
    result = allModules.checkRabbitRiddleBonusAnswer(
        data["numBonusRabbits"],
        data["answerToBonus"]
    )
    if result and request.user.is_authenticated:
        updateSolvedPuzzle(request.user, PuzzleNames.RABBIT_PUZZLE_P2)
    return Response({"result": "success" if result else "fail"})

@api_view(['POST'])
def getRoosterRiddleMove(request):
    data = deserialize_request(request, SingleIntSerializer)
    roosterMove = allModules.getRoosterRiddleMove(data["submittedInt"])
    if roosterMove == 0 and request.user.is_authenticated:
        updateSolvedPuzzle(request.user, PuzzleNames.ROOSTER_PUZZLE_P1)
    return Response(roosterMove)

@api_view(['POST'])
def raceHorses(request):
    data = deserialize_request(request, RaceHorsesSerializer)
    result = allModules.submitRace(
        data["randSeed"],
        data["submittedHorsesInt"]
    )
    return Response(result)

@api_view(['POST'])
def getInitialPiles(request):
    data = deserialize_request(request, SingleIntSerializer)
    result = allModules.getInitialPiles(data["submittedInt"])
    return Response(result)

def deserialize_request(request, serializer_class):
    serializer = serializer_class(data=request.data)
    serializer.is_valid(raise_exception=True)
    return serializer.validated_data

def updateSolvedPuzzle(puzzleUser, solvedPuzzleName):
    _, created = UserSolvedPuzzles.objects.get_or_create(
        user=puzzleUser,
        solvedPuzzle=solvedPuzzleName
    )
    if created:
        cache.delete(LEADERBOARD_CACHE_KEY)
        puzzleUser.numPuzzlesSolved += 1
        puzzleUser.save(update_fields=["numPuzzlesSolved"])