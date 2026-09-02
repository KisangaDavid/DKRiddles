import ctypes
import os

so_path = os.path.join(os.path.dirname(__file__), "allModules.so")
allModules = ctypes.CDLL(so_path)

allModules.checkRatRiddleAnswer.argtypes = [ctypes.c_int]
allModules.checkRatRiddleAnswer.restype = ctypes.c_int

allModules.checkRatRiddleBonusAnswer.argtypes = [ctypes.c_int, ctypes.c_int]
allModules.checkRatRiddleBonusAnswer.restype = ctypes.c_int  

allModules.checkHorseRiddleAnswer.argtypes = [
    ctypes.c_int,
    ctypes.c_int,
    ctypes.POINTER(ctypes.c_uint32),
    ctypes.c_int
]
allModules.checkHorseRiddleAnswer.restype = ctypes.c_int

allModules.checkRabbitRiddleBonusAnswer.argtypes = [ctypes.c_int, ctypes.c_int]
allModules.checkRabbitRiddleBonusAnswer.restype = ctypes.c_bool  

allModules.getRoosterRiddleMove.argtypes = [ctypes.c_int]
allModules.getRoosterRiddleMove.restype = ctypes.c_int

allModules.submitRace.argtypes = [ctypes.c_int, ctypes.c_int]
allModules.submitRace.restype = ctypes.c_int

allModules.getInitialPiles.argtypes = [ctypes.c_int]
allModules.getInitialPiles.restype = ctypes.c_int