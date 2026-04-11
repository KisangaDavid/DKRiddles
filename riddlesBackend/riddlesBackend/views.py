from django.http import HttpResponse
import json

import ctypes 
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt

from riddlesBackend.backendDll import allModules


from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework.response import Response

from django.core.exceptions import ObjectDoesNotExist


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
        
@csrf_exempt
@require_POST
async def checkRatRiddleAnswer(request):
    # my_lib.getInitialPiles.argtypes = [ctypes.c_int, ctypes.c_int]
    # my_lib.getInitialPiles.restype = ctypes.c_int
    binaryStringPlan = json.loads(request.body)["submittedPlan"]
    intRepresentation = int(binaryStringPlan, 2)
    print(f"submittedPlan as intRepresentation: {intRepresentation}")
    result = allModules.checkRatRiddleAnswer(intRepresentation)
    print(f"result: {result}")
    return HttpResponse(result)

@csrf_exempt
@require_POST
async def checkRatRiddleBonusAnswer(request):
    # my_lib.getInitialPiles.argtypes = [ctypes.c_int, ctypes.c_int]
    # my_lib.getInitialPiles.restype = ctypes.c_int
    body = json.loads(request.body)
    numHouses = int(body["numHouses"])
    answerToBonus = int(body["answerToBonus"])
    result = allModules.checkRatRiddleBonusAnswer(numHouses, answerToBonus)
    return HttpResponse(json.dumps({"result": "success" if result else "fail"}))

@csrf_exempt
@require_POST
async def raceHorses(request):
    # my_lib.getInitialPiles.argtypes = [ctypes.c_int, ctypes.c_int]
    # my_lib.getInitialPiles.restype = ctypes.c_int
    body = json.loads(request.body)
    randSeed = int(body["randSeed"])
    submittedHorses = int(body["submittedHorsesInt"])
    result = allModules.submitRace(randSeed, submittedHorses)
    return HttpResponse(result)

@csrf_exempt
@require_POST
async def checkHorseRiddleAnswer(request):
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
@require_POST
async def getInitialPiles(request):
    # my_lib.getInitialPiles.argtypes = [ctypes.c_int, ctypes.c_int]
    # my_lib.getInitialPiles.restype = ctypes.c_int
    randSeed = int(json.loads(request.body)["randSeed"])
    return HttpResponse(allModules.getInitialPiles(randSeed))


@csrf_exempt
@require_POST
async def getRoosterRiddleMove(request):
    # my_lib.getInitialPiles.argtypes = [ctypes.c_int, ctypes.c_int]
    # my_lib.getInitialPiles.restype = ctypes.c_int
    pileState = int(json.loads(request.body)["pileState"])
    return HttpResponse(allModules.getRoosterRiddleMove(pileState))

@csrf_exempt
@require_POST
async def checkRabbitRiddleBonusAnswer(request):
    # my_lib.getInitialPiles.argtypes = [ctypes.c_int, ctypes.c_int]
    # my_lib.getInitialPiles.restype = ctypes.c_int
    body = json.loads(request.body)
    numRabbits = int(body["numBonusRabbits"])
    answerToBonus = int(body["answerToBonus"])
    result = allModules.checkRabbitRiddleBonusAnswer(numRabbits, answerToBonus)
    return HttpResponse(json.dumps({"result": "success" if result else "fail"}))