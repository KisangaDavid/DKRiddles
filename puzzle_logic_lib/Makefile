# CPP compiler
CPP = clang++

# CPP general compiler flags for dev
CPP_FLAGS = -Wall -Wno-unknown-attributes -Werror -Weffc++ -Wextra -Wconversion -Wsign-conversion -std=c++23 -Oz -g

# CPP general compiler flags for prod
CPP_OPT_FLAGS = -Wall -Wno-unknown-attributes -Werror -Weffc++ -Wextra -Wconversion -Wsign-conversion -std=c++23 -Oz

DLL_FLAGS = -shared 
SO_FLAGS = -shared -fPIC

# Source files
SRCS = ratRiddle.cpp horseRiddle.cpp roosterRiddle.cpp rabbitRiddle.cpp puzzleUtils.cpp

# Object files
OBJS = $(SRCS:.cpp=.o)

DLL_FILE_NAME_BASE = "../backend/puzzles/allModules"
SO_FILE_NAME_BASE = "../backend/puzzles/allModules"

# Compile cpp source into object files
%.o: %.cpp $(HDRS)
	$(CPP) $(CPP_FLAGS) -c $< -o $@

dllFile: $(SRCS)
	$(CPP) $(CPP_OPT_FLAGS) $(DLL_FLAGS) $^ -o $(DLL_FILE_NAME_BASE).dll 

soFile: $(SRCS)
	$(CPP) $(CPP_OPT_FLAGS) $(SO_FLAGS) $^ -o $(SO_FILE_NAME_BASE).so
	
# Clean build artifacts
clean:
	del *.pdb *.ilk *.wasm *.exe *.o