#include "puzzleUtils.h"
#include <vector>

uint32_t getNimsumOfPiles(std::vector<uint32_t> piles) {
    uint32_t nimsum = 0;
    for (uint32_t pile : piles) {
        nimsum ^= pile;
    }
    return nimsum;
}

std::vector<uint32_t> getRandomPlay(std::vector<uint32_t> piles) {
    // placeholder
    return {1, 2};
}

std::vector<uint32_t> getOptimalPlay(uint32_t nimsumAllPiles, std::vector<uint32_t> piles) {
    for (std::size_t i = 0; i != piles.size(); ++i) {
        if ((nimsumAllPiles ^ piles[i]) < piles[i]) {
            return {static_cast<uint32_t>(i), piles[i] - (nimsumAllPiles ^ piles[i])};
        }
    }
}

std::vector<uint32_t> getMove(std::vector<uint32_t> piles) {
    uint32_t nimsumAllPiles = getNimsumOfPiles(piles);
    if(nimsumAllPiles != 0) {
        return getOptimalPlay(nimsumAllPiles, piles);
    }
    else {
        return getRandomPlay(piles);
    }
}

int main() {
    std::vector<uint32_t> piles0 {0,3,4,5};
    std::vector<uint32_t> piles1 {1,2,3,4};
    std::vector<uint32_t> piles2 {1,0,3,0};
    std::vector<uint32_t> piles3 {0,1,2,3};
    getMove(piles0);
    getMove(piles1);
    getMove(piles2);
    getMove(piles3);
}


