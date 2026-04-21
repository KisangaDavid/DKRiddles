#include "puzzleUtils.h"

extern "C" {
    __attribute__((visibility("default"))) bool checkRabbitRiddleBonusAnswer(uint32_t numRabbits, uint32_t submittedAnswer) {
        return submittedAnswer == numRabbits * numRabbits + 2 * numRabbits;
    }
}
