from django.http import HttpResponse
import json

import ctypes 
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from puzzles.models import UserSolvedPuzzles, PuzzleNames
from puzzles.backendDll import allModules

HORSE_PUZZLE_MIN_RACES = 7  
RABBIT_RIDDLE_BASE_NUM_RABBITS = 3

# TODO: fill in types for all of the dll / so calls in backendDll.py
# TODO: could pass in rand seed and history of moves? use user id as well to make it super unique?
@csrf_exempt
@api_view(['POST'])
def checkRatRiddleAnswer(request):
    binaryStringPlan = json.loads(request.body)["submittedPlan"]
    intRepresentation = int(binaryStringPlan, 2)
    result = allModules.checkRatRiddleAnswer(intRepresentation)
    if result == -1 and request.user.is_authenticated:
        updateSolvedPuzzle(request.user, PuzzleNames.RAT_PUZZLE_P1)
    return HttpResponse(result)

@csrf_exempt
@api_view(['POST'])
def checkRatRiddleBonusAnswer(request):
    # my_lib.getInitialPiles.argtypes = [ctypes.c_int, ctypes.c_int]
    # my_lib.getInitialPiles.restype = ctypes.c_int
    body = json.loads(request.body)
    numHouses = int(body["numHouses"])
    answerToBonus = int(body["answerToBonus"])
    result = allModules.checkRatRiddleBonusAnswer(numHouses, answerToBonus)
    if result and request.user.is_authenticated:
        updateSolvedPuzzle(request.user, PuzzleNames.RAT_PUZZLE_P2)
    return HttpResponse(json.dumps({"result": "success" if result else "fail"}))

@csrf_exempt
@api_view(['POST'])
def checkHorseRiddleAnswer(request):
    # my_lib.getInitialPiles.argtypes = [ctypes.c_int, ctypes.c_int]
    # my_lib.getInitialPiles.restype = ctypes.c_int
    body = json.loads(request.body)
    randSeed = int(body["randSeed"])
    fastestHorsesInt = int(body["fastestHorsesInt"])
    submittedRaces = body["submittedRaces"]
    numRaces = int(body["numRaces"])
    submittedRaces = (ctypes.c_uint32 * numRaces)(*submittedRaces)
    result = allModules.checkHorseRiddleAnswer(randSeed, fastestHorsesInt, submittedRaces, numRaces)
    if result == 0 and numRaces == HORSE_PUZZLE_MIN_RACES and request.user.is_authenticated:
        updateSolvedPuzzle(request.user, PuzzleNames.HORSE_PUZZLE_P1)
    return HttpResponse(result)

@csrf_exempt
@api_view(['POST'])
def checkRabbitRiddleAnswer(request):
    # my_lib.getInitialPiles.argtypes = [ctypes.c_int, ctypes.c_int]
    # my_lib.getInitialPiles.restype = ctypes.c_int
    body = json.loads(request.body)
    numMoves = int(body["numMoves"])
    result = allModules.checkRabbitRiddleBonusAnswer(RABBIT_RIDDLE_BASE_NUM_RABBITS, numMoves)
    if result and request.user.is_authenticated:
        updateSolvedPuzzle(request.user, PuzzleNames.RABBIT_PUZZLE_P1)
    return HttpResponse(json.dumps({"result": "success" if result else "fail"}))

@csrf_exempt
@api_view(['POST'])
def checkRabbitRiddleBonusAnswer(request):
    # my_lib.getInitialPiles.argtypes = [ctypes.c_int, ctypes.c_int]
    # my_lib.getInitialPiles.restype = ctypes.c_int
    body = json.loads(request.body)
    numRabbits = int(body["numBonusRabbits"])
    answerToBonus = int(body["answerToBonus"])
    result = allModules.checkRabbitRiddleBonusAnswer(numRabbits, answerToBonus)
    if result and request.user.is_authenticated:
        updateSolvedPuzzle(request.user, PuzzleNames.RABBIT_PUZZLE_P2)
    return HttpResponse(json.dumps({"result": "success" if result else "fail"}))

@csrf_exempt
@api_view(['POST'])
def getRoosterRiddleMove(request):
    # my_lib.getInitialPiles.argtypes = [ctypes.c_int, ctypes.c_int]
    # my_lib.getInitialPiles.restype = ctypes.c_int
    pileState = int(json.loads(request.body)["pileState"])
    roosterMove = allModules.getRoosterRiddleMove(pileState)
    if roosterMove == 0 and request.user.is_authenticated:
        updateSolvedPuzzle(request.user, PuzzleNames.ROOSTER_PUZZLE_P1)
    return HttpResponse(roosterMove)

@csrf_exempt
@api_view(['POST'])
def raceHorses(request):
    # my_lib.getInitialPiles.argtypes = [ctypes.c_int, ctypes.c_int]
    # my_lib.getInitialPiles.restype = ctypes.c_int
    body = json.loads(request.body)
    randSeed = int(body["randSeed"])
    submittedHorses = int(body["submittedHorsesInt"])
    result = allModules.submitRace(randSeed, submittedHorses)
    return HttpResponse(result)

@csrf_exempt
@api_view(['POST'])
def getInitialPiles(request):
    # my_lib.getInitialPiles.argtypes = [ctypes.c_int, ctypes.c_int]
    # my_lib.getInitialPiles.restype = ctypes.c_int
    randSeed = int(json.loads(request.body)["randSeed"])
    return HttpResponse(allModules.getInitialPiles(randSeed))

def updateSolvedPuzzle(puzzleUser, solvedPuzzleName):
    _, created = UserSolvedPuzzles.objects.get_or_create(
        user=puzzleUser,
        solvedPuzzle=solvedPuzzleName
    )
    if created:
        puzzleUser.numPuzzlesSolved += 1
        puzzleUser.save(update_fields=["numPuzzlesSolved"])
