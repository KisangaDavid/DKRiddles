#include "puzzleUtils.h"
#include <vector>

namespace puzzleUtils {
    std::vector<uint32_t> convertIntToVec(uint32_t input, uint32_t numIntsInInput, uint32_t numBitsPerInt) {
        std::vector<uint32_t> to_return;
        uint32_t bitmask = (1 << numBitsPerInt) - 1; 
        for (uint32_t i {0}; i < numIntsInInput; i++) {
            to_return.push_back((input & bitmask));
            input >>= numBitsPerInt; 
        }
        return to_return;
    }

    uint32_t convertVecToInt(std::vector<uint32_t> vec, uint32_t numBitsPerInt) {
        uint32_t intForm = 0;
        for(uint32_t i : vec) {
            intForm <<= numBitsPerInt;
            intForm = intForm | i;
        }
        return intForm;
    }
}