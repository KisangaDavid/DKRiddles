from django.http import HttpResponse
import json

import ctypes 
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from puzzles.backendDll import allModules

# TODO: fill in types for all of the dll / so calls
@csrf_exempt
@api_view(['POST'])
def checkRatRiddleAnswer(request):
    # my_lib.getInitialPiles.argtypes = [ctypes.c_int, ctypes.c_int]
    # my_lib.getInitialPiles.restype = ctypes.c_int
    print(request.user)
    print(request.headers)
    print(request.user.is_authenticated)
    binaryStringPlan = json.loads(request.body)["submittedPlan"]
    intRepresentation = int(binaryStringPlan, 2)
    print(f"submittedPlan as intRepresentation: {intRepresentation}")
    result = allModules.checkRatRiddleAnswer(intRepresentation)
    print(f"result: {result}")
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
    return HttpResponse(json.dumps({"result": "success" if result else "fail"}))

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
    return HttpResponse(result)

@csrf_exempt
@api_view(['POST'])
def getInitialPiles(request):
    # my_lib.getInitialPiles.argtypes = [ctypes.c_int, ctypes.c_int]
    # my_lib.getInitialPiles.restype = ctypes.c_int
    randSeed = int(json.loads(request.body)["randSeed"])
    return HttpResponse(allModules.getInitialPiles(randSeed))


@csrf_exempt
@api_view(['POST'])
def getRoosterRiddleMove(request):
    # my_lib.getInitialPiles.argtypes = [ctypes.c_int, ctypes.c_int]
    # my_lib.getInitialPiles.restype = ctypes.c_int
    pileState = int(json.loads(request.body)["pileState"])
    return HttpResponse(allModules.getRoosterRiddleMove(pileState))

@csrf_exempt
@api_view(['POST'])
def checkRabbitRiddleBonusAnswer(request):
    # my_lib.getInitialPiles.argtypes = [ctypes.c_int, ctypes.c_int]
    # my_lib.getInitialPiles.restype = ctypes.c_int
    body = json.loads(request.body)
    numRabbits = int(body["numBonusRabbits"])
    answerToBonus = int(body["answerToBonus"])
    result = allModules.checkRabbitRiddleBonusAnswer(numRabbits, answerToBonus)
    return HttpResponse(json.dumps({"result": "success" if result else "fail"}))