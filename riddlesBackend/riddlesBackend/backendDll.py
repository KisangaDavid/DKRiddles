import ctypes
import os

# Load the allModules dll
dll_path = os.path.join(os.path.dirname(__file__), "allModules.dll")
allModules = ctypes.CDLL(dll_path)
