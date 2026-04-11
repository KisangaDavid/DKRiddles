# CPP compiler
CPP = clang++

# CPP general compiler flags for dev
CPP_FLAGS = -Wall -Wno-unknown-attributes -Werror -Weffc++ -Wextra -Wconversion -Wsign-conversion -std=c++23 -Oz -g

# CPP general compiler flags for prod
CPP_OPT_FLAGS = -Wall -Wno-unknown-attributes -Werror -Weffc++ -Wextra -Wconversion -Wsign-conversion -std=c++23 -Oz

# TODO: compile to so file for so we can deploy on a linux box
DLL_FLAGS = -shared 

# WASM specific compile flags
WASMCOMPFLAGS = --target=wasm32-wasi -fno-exceptions --sysroot="C:\Coding\wasi-sdk-25.0-x86_64-windows\share\wasi-sysroot" -Xlinker --export-dynamic
# Source files
SRCS = ratRiddle.cpp horseRiddle.cpp roosterRiddle.cpp rabbitRiddle.cpp puzzleUtils.cpp

HDRS = wasmUtils.h

# Object files
OBJS = $(SRCS:.cpp=.o)

# Wasm module name
WASM_ALL_MODULES_NAME = "../../public/allModules.wasm

DLL_FILE_NAME = "../../config/config/allModules.dll"

# Default target (wasm binary)
all: wasm

# Compile cpp source into object files
%.o: %.cpp $(HDRS)
	$(CPP) $(CPP_FLAGS) -c $< -o $@

# Create the wasm module file from the cpp source
wasmAll: $(SRCS)
	$(CPP) $(CPP_FLAGS) $(WASMCOMPFLAGS) $^ -o $(WASM_ALL_MODULES_NAME) 

wasmAllOpt: $(SRCS)
	$(CPP) $(CPP_OPT_FLAGS) $(WASMCOMPFLAGS) $^ -o $(WASM_ALL_MODULES_NAME) 

dllFile: $(SRCS)
	$(CPP) $(CPP_OPT_FLAGS) $(DLL_FLAGS) $^ -o $(DLL_FILE_NAME) 
	
# Clean build artifacts
clean:
	del *.pdb *.ilk *.wasm *.exe *.o