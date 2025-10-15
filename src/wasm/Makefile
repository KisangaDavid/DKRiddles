# CPP compiler
CPP = clang++

# CPP general compiler flags for dev
CPP_FLAGS = -Wall -Wno-unknown-attributes -Werror -Weffc++ -Wextra -Wconversion -Wsign-conversion -std=c++23 -Oz -g

# CPP general compiler flags for prod
CPP_OPT_FLAGS = -Wall -Wno-unknown-attributes -Werror -Weffc++ -Wextra -Wconversion -Wsign-conversion -std=c++23 -Oz

# WASM specific compile flags
WASMCOMPFLAGS = --target=wasm32-wasi -fno-exceptions --sysroot="PATH_TO_WASI_SYSROOT" -Xlinker --export-dynamic

# Source files
SRCS = ratRiddle.cpp horseRiddle.cpp roosterRiddle.cpp puzzleUtils.cpp

HDRS = wasmUtils.h

# Object files
OBJS = $(SRCS:.cpp=.o)

# Executable name
EXEC = ratRiddle.exe

# Wasm module name
WASM_ALL_MODULES_NAME = allModules.wasm

# Default target (wasm binary)
all: wasm

# Compile cpp source into object files
%.o: %.cpp $(HDRS)
	$(CPP) $(CPP_FLAGS) -c $< -o $@

# Link object files to create a non-wasm executable
exe: $(OBJS)
	$(CPP) $(CPP_FLAGS) $^ -o $(EXEC)

# Create the wasm module file from the cpp source
wasmAll: $(SRCS)
	$(CPP) $(CPP_FLAGS) $(WASMCOMPFLAGS) $^ -o $(WASM_ALL_MODULES_NAME) 

wasmAllOpt: $(SRCS)
	$(CPP) $(CPP_OPT_FLAGS) $(WASMCOMPFLAGS) $^ -o $(WASM_ALL_MODULES_NAME) 
	
# Clean build artifacts
clean:
	del *.pdb *.ilk *.wasm *.exe *.o