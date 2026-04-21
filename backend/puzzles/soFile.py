import ctypes
import os

# Load the allModules so file
so_path = os.path.join(os.path.dirname(__file__), "allModules.so")
allModules = ctypes.CDLL(so_path)

# int checkRatRiddleAnswer(int plan)
allModules.checkRatRiddleAnswer.argtypes = [ctypes.c_int]
allModules.checkRatRiddleAnswer.restype = ctypes.c_int

# bool/int checkRatRiddleBonusAnswer(int numHouses, int answer)
allModules.checkRatRiddleBonusAnswer.argtypes = [ctypes.c_int, ctypes.c_int]
allModules.checkRatRiddleBonusAnswer.restype = ctypes.c_int  

# int checkHorseRiddleAnswer(int randSeed, int fastestHorsesInt, uint32_t* races, int numRaces)
allModules.checkHorseRiddleAnswer.argtypes = [
    ctypes.c_int,
    ctypes.c_int,
    ctypes.POINTER(ctypes.c_uint32),
    ctypes.c_int
]
allModules.checkHorseRiddleAnswer.restype = ctypes.c_int

# bool/int checkRabbitRiddleBonusAnswer(int numRabbits, int numMoves)
allModules.checkRabbitRiddleBonusAnswer.argtypes = [ctypes.c_int, ctypes.c_int]
allModules.checkRabbitRiddleBonusAnswer.restype = ctypes.c_bool  

# int getRoosterRiddleMove(int pileState)
allModules.getRoosterRiddleMove.argtypes = [ctypes.c_int]
allModules.getRoosterRiddleMove.restype = ctypes.c_int

# int submitRace(int randSeed, int submittedHorses)
allModules.submitRace.argtypes = [ctypes.c_int, ctypes.c_int]
allModules.submitRace.restype = ctypes.c_int

# int getInitialPiles(int randSeed)
allModules.getInitialPiles.argtypes = [ctypes.c_int]
allModules.getInitialPiles.restype = ctypes.c_int