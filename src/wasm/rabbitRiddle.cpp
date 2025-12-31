#include "puzzleUtils.h"

[[clang::export_name("checkRabbitBonusAnswer")]]
bool checkRabbitBonusAnswer(uint32_t numRats, uint32_t submittedAnswer) {
    return submittedAnswer == numRats * numRats + 2 * numRats;
}
