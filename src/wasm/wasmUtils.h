#include <vector>

#ifndef UTILS_H
#define UTILS_H

namespace wasmUtils {
    std::vector<uint32_t> convertIntToVec(uint32_t input, uint32_t numIntsInInput, uint32_t numBitsPerInt);
    uint32_t convertVecToInt(std::vector<uint32_t> vec, uint32_t numBitsPerInt);
}

#endif 