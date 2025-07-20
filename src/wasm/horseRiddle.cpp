#include <vector>
#include <cstdint>

const uint32_t NUM_HORSES = 25;
const uint32_t NUM_HORSES_PER_RACE = 5;
const uint32_t HORSE_ORDER_CORRECT_CODE = 0;
const uint32_t POTENTIALLY_FASTER_HORSE_CODE = 1;
const uint32_t DEFINITE_FASTER_HORSE_CODE = 2;

class Horse {
    public:
        uint32_t absolutePosition {};
        bool isDeleted {false};
        

        Horse() : absolutePosition {positionGenerator++} {}

        std::vector<uint32_t> getSlowerThan() {
            return slowerThan;
        }
        void addSlowerThan(uint32_t fasterHorse) {
            slowerThan.push_back(fasterHorse);
        }

    private:
        std::vector<uint32_t> slowerThan {};
        static inline uint32_t positionGenerator {0};
};
// static inline = initial numbers dont get populated for some reason
class HorseRiddle {
    public:
        Horse* horses[25] {};

        HorseRiddle() {
            initHorses(12,1000);
        }

        void initHorses(uint32_t state, uint32_t num_shuffles) {
            for (uint32_t i {0}; i < NUM_HORSES; i++) {
                horses[i] = new Horse(); // might need new horse here
            }
            uint32_t idx1 {};
            uint32_t idx2 {};
            for(size_t i {0}; i < num_shuffles; i++) {
                state = randomizer(&state);
                idx1 = state % 25;
                state = randomizer(&state);
                idx2 = state % 25;
                if (idx1 == idx2) {
                    continue;
                }
                horses[idx1]->absolutePosition = horses[idx1]->absolutePosition ^ horses[idx2]->absolutePosition;
                horses[idx2]->absolutePosition = horses[idx1]->absolutePosition ^ horses[idx2]->absolutePosition;
                horses[idx1]->absolutePosition = horses[idx1]->absolutePosition ^ horses[idx2]->absolutePosition;
            }
        }
    
        // TODO: comment out once done
        uint32_t submitRace(std::vector<uint32_t> inputHorses) {
            std::vector<uint32_t> orderedHorses = getOrder(inputHorses);
            updateOrderGraph(orderedHorses);
            return orderedHorses[0];
        }

        std::vector<uint32_t> checkAnswer(std::vector<uint32_t> inputPositions) {
            for (uint32_t inputPosition : inputPositions) {
                std::vector<uint32_t> sources = getSources();
                if (sources.size() != 1) {
                    for (uint32_t source : sources) {
                        if (source != inputPosition) {
                            return std::vector<uint32_t> {POTENTIALLY_FASTER_HORSE_CODE, source, inputPosition};
                        }
                    }
                }
                if (sources[0] != inputPosition) {
                    return std::vector<uint32_t> {DEFINITE_FASTER_HORSE_CODE, sources[0], inputPosition};
                }
                horses[sources[0]]->isDeleted = true;
            }
            return std::vector<uint32_t> {HORSE_ORDER_CORRECT_CODE, 0, 0};
        }

    private:
        uint32_t randomizer(uint32_t *state) {
            return *state = (uint64_t)*state * 48271 % 0x7fffffff;
        }

        std::vector<uint32_t> getOrder(std::vector<uint32_t> inputHorses) {
            std::vector<uint32_t> orderedHorses;
            uint32_t min {NUM_HORSES + 1};
            uint32_t horseToInsert {};
            for(size_t i {0}; i < inputHorses.size(); i++) {
                for(uint32_t curHorseIdx : inputHorses) {
                    uint32_t curHorseAbsolutePosition = horses[curHorseIdx]->absolutePosition;
                    if (curHorseAbsolutePosition < min && (orderedHorses.size() == 0 || curHorseAbsolutePosition > horses[orderedHorses.back()]->absolutePosition)) {
                        min = curHorseAbsolutePosition;
                        horseToInsert = curHorseIdx;
                    }
                }
                min = NUM_HORSES + 1;
                orderedHorses.push_back(horseToInsert);
            }
            return orderedHorses;
        }

        void updateOrderGraph(std::vector<uint32_t> orderedHorses) {
            uint32_t fasterHorseIdx = orderedHorses[0]; 
            for (uint32_t i {1}; i < orderedHorses.size(); i++) {
                horses[orderedHorses[i]]->addSlowerThan(fasterHorseIdx);
                fasterHorseIdx = orderedHorses[i];
            }
        }

        std::vector<uint32_t> getSources() {
            std::vector<uint32_t> sources {};
            for(uint32_t i {0}; i < NUM_HORSES; i++) {
                if(horses[i]->isDeleted) {
                    continue;
                }
                uint32_t trueNumSlowerThan {0};
                for(uint32_t idx : horses[i]->getSlowerThan()) {
                    if (!horses[idx]->isDeleted) {
                        ++trueNumSlowerThan;
                    }
                }
                if(trueNumSlowerThan == 0) {
                    sources.push_back(i);
                }
            }
            return sources;
        }
};

HorseRiddle& getHorseRiddle()
{
    static HorseRiddle horseRiddle;
    return horseRiddle;
}

// [[clang::export_name("initPuzzle")]]
// void initPuzzle(HorseRiddle& horseRiddle) {
//     horseRiddle.randomizeHorseOrder(12, 1000);
// }

[[clang::export_name("submitRace")]]
uint32_t submitRace(uint32_t input) {
    HorseRiddle horseRiddle = getHorseRiddle();
    // unpack the input and then submit the race
    std::vector<uint32_t> horsesToRace {};
    uint32_t fiveBitMask = 0x1f; // 5 bit mask
    for (uint32_t i = 0; i < NUM_HORSES_PER_RACE; i++) {
        horsesToRace.push_back(input & fiveBitMask);
        input >>= 5; 
    }
    horseRiddle.submitRace(horsesToRace);
    return input;
}

[[clang::export_name("checkAnswer")]]
uint32_t checkAnswer(uint32_t input) {
    HorseRiddle horseRiddle = getHorseRiddle();
    std::vector<uint32_t> submittedHorses {};
    uint32_t fiveBitMask = 0x1f; // 5 bit mask
    for (uint32_t i {0}; i < 3; i++) {
        submittedHorses.push_back(input & fiveBitMask);
        input >>= 5; 
    }
    std::vector<uint32_t> answer = horseRiddle.checkAnswer(submittedHorses);
    uint32_t answerIntForm = 0;
    for(uint32_t i : answer) {
        answerIntForm <<= 5;
        answerIntForm = answerIntForm | i;
    }
    return answerIntForm;
}    

// [[clang::export_name("doEverything")]]
// uint32_t doEverything() {
    
//     submitRace(34916);
//     submitRace(5446921);
//     submitRace(10858926);
//     submitRace(16270931);
//     submitRace(21682936);
//     submitRace(209462);
//     submitRace(18038548);
//     return checkAnswer(21270);
// }

int main() {

    // uint32_t res = doEverything();
    // return static_cast<int>(res);
    // checkAnswer(21270);
    // // HorseRiddle horseRiddle;
    // std::vector<uint32_t> myRace1 {0,1,2,3,4};
    // std::vector<uint32_t> myRace2 {5,6,7,8,9};
    // std::vector<uint32_t> myRace3 {10,11,12,13,14};
    // std::vector<uint32_t> myRace4 {15,16,17,18,19};
    // std::vector<uint32_t> myRace5 {20,21,22,23,24};
    // std::vector<uint32_t> myRace6 {0,6,12,17,22};
    // std::vector<uint32_t> myRace7 {17,6,15,24,20};
    // std::vector<uint32_t> positions {22,24,20};
    // // std::vector<uint32_t> myRace7 {20, 6,  // 22 is a LOCK race 4 is group 2 race 2 is group 3
    // // std::vector<uint32_t> myRace {1,2,3,4,5};
    // int race1Winner = horseRiddle.submitRace(myRace1);
    // int race2Winner = horseRiddle.submitRace(myRace2);
    // int race3Winner = horseRiddle.submitRace(myRace3);
    // int race4Winner = horseRiddle.submitRace(myRace4);
    // int race5Winner = horseRiddle.submitRace(myRace5);
    // int race6Winner = horseRiddle.submitRace(myRace6);
    // int race7Winner = horseRiddle.submitRace(myRace7);
    // // final 3: 22, 24, 20
    // // race 7: 2 & 3 from race 6 (17,6), 2nd from race 4 (15), 2nd 3rd from dub squad (race 5) (24,20)
    // std::vector<uint32_t> answer2 = horseRiddle.checkAnswer({1,2,3});
    // std::vector<uint32_t> answer1 = horseRiddle.checkAnswer(positions);
}