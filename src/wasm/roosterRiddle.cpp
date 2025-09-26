#include "puzzleUtils.h"
#include <vector>

const uint32_t NUM_PILES = 4;
const uint32_t NUM_BITS_PER_PILE = 4;
const uint32_t MIN_STARTING_PILE = 8;
const uint32_t MAX_STARTING_PILE = 12;

uint32_t getNimsumOfPiles(std::vector<uint32_t> piles) {
    uint32_t nimsum = 0;
    for (uint32_t pile : piles) {
        nimsum ^= pile;
    }
    return nimsum;
}

std::vector<uint32_t> getRandomPlay(std::vector<uint32_t> piles, uint32_t randSource) {
    std::vector<uint32_t> pilesToPlayIn {};
    for (std::size_t i = 0; i < NUM_PILES; ++i) {
        if (piles[i] > 0) {
            pilesToPlayIn.push_back(i);
        }
    }
    uint32_t pileToPlayIn = pilesToPlayIn[randSource % pilesToPlayIn.size()];
    randSource = puzzleUtils::randomizer(randSource);
    uint32_t numToTake = pilesToPlayIn.size() == 1 ? 1 : randSource % 2 + 1;
    return {pileToPlayIn, numToTake};
}

std::vector<uint32_t> getOptimalPlay(uint32_t nimsumAllPiles, std::vector<uint32_t> piles) {
    for (std::size_t i = 0; i < NUM_PILES; ++i) {
        if ((nimsumAllPiles ^ piles[i]) < piles[i]) {
            return {static_cast<uint32_t>(i), piles[i] - (nimsumAllPiles ^ piles[i])};
        }
    }
    return {0,0};
}

std::vector<uint32_t> getMove(std::vector<uint32_t> piles, uint32_t randSource) {
    uint32_t nimsumAllPiles = getNimsumOfPiles(piles);
    if(nimsumAllPiles != 0) {
        return getOptimalPlay(nimsumAllPiles, piles);
    }
    else {
        return getRandomPlay(piles, randSource);
    }
}

[[clang::export_name("getInitialPiles")]]
std::vector<uint32_t> getInitialPiles(uint32_t randSource) {
    std::vector<uint32_t> initialPiles {};
    for (std::size_t i = 0; i < NUM_PILES - 1; ++i) {
        randSource = puzzleUtils::randomizer(randSource);
        initialPiles.push_back(MIN_STARTING_PILE + randSource % (MAX_STARTING_PILE - MIN_STARTING_PILE));
    }
    // TODO: See if we can generate a final pile s.t. the nimsum of the piles will always be zero
    return {0,0};
}

[[clang::export_name("getRoosterRiddleMove")]]
uint32_t getRoosterRiddleMove(uint32_t inputPiles, uint32_t randSource) {
    std::vector<uint32_t> piles = puzzleUtils::convertIntToVec(inputPiles, NUM_PILES, NUM_BITS_PER_PILE);
    std::vector<uint32_t> move = getMove(piles, randSource);
    return puzzleUtils::convertVecToInt(move, NUM_BITS_PER_PILE);
}    

int main() {
    std::vector<uint32_t> piles0 {0,3,4,5};
    std::vector<uint32_t> piles1 {1,2,3,4};
    std::vector<uint32_t> piles2 {1,0,3,0};
    std::vector<uint32_t> piles3 {0,1,2,3};
    getMove(piles0, 12);
    getMove(piles1, 12);
    getMove(piles2, 12);
    getMove(piles3, 12);
}