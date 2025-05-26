# CPP compiler
CPP = clang++

# CPP general compiler flags
CPPFLAGS = -Wall -Wno-unknown-attributes -Werror -Weffc++ -Wextra -Wconversion -Wsign-conversion -std=c++23 -Oz

# WASM specific compile flags
WASMCOMPFLAGS = --target=wasm32-wasi -fno-exceptions --sysroot="C:\Coding\wasi-sdk-25.0-x86_64-windows\share\wasi-sysroot" -Xlinker --export-dynamic

# Source files
SRCS = ratRiddle.cpp

# Object files
OBJS = $(SRCS:.cpp=.o)

# Executable name
EXEC = ratRiddle.exe

# Wasm module name
WASM_MODULE_NAME = ratRiddle.wasm

# Default target (wasm binary)
all: wasm

# Compile cpp source into object files
%.o: %.cpp $(HDRS)
	$(CPP) $(CPPFLAGS) -c $< -o $@

# Link object files to create a non-wasm executable
exe: $(OBJS)
	$(CPP) $(CPPFLAGS) $^ -o $(EXEC)

# Create the wasm module file from the cpp source
wasm: $(SRCS)
	$(CPP) $(CPPFLAGS) $(WASMCOMPFLAGS) $^ -o $(WASM_MODULE_NAME) 

# Clean build artifacts
clean:
	del *.pdb *.ilk *.wasm *.exe *.o