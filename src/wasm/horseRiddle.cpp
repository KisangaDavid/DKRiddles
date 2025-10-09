#include "puzzleUtils.h"
#include <vector>
// #include <cstdint>

const uint32_t NUM_SHUFFLES = 1000;
const uint32_t NUM_TOTAL_HORSES = 25;
const uint32_t NUM_HORSES_PER_RACE = 5;
const uint32_t NUM_BITS_PER_HORSE = 5;
const uint32_t NUM_HORSES_TO_SUBMIT = 3;

const uint32_t HORSE_ORDER_CORRECT_CODE = 0;
const uint32_t POTENTIAL_FASTER_HORSE_CODE = 1;
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
        void resetSlowerThan() {
            slowerThan = std::vector<uint32_t> {};
        }

    private:
        std::vector<uint32_t> slowerThan {};
        static inline uint32_t positionGenerator {0};
};

class HorseRiddle {
    public:
        Horse* horses[25] {nullptr};

        HorseRiddle() {
            initHorses();
            randomizeHorseOrder(12, NUM_SHUFFLES);
        }

        void initHorses() {
            for (uint32_t i {0}; i < NUM_TOTAL_HORSES; i++) {
                horses[i] = new Horse();
            }
        }
    
        std::vector<uint32_t> submitRace(std::vector<uint32_t> inputHorses) {
            std::vector<uint32_t> orderedHorses = getOrder(inputHorses);
            updateOrderGraph(orderedHorses);
            return orderedHorses;
        }

        std::vector<uint32_t> checkAnswer(std::vector<uint32_t> inputPositions) {
            for (uint32_t inputPosition : inputPositions) {
                std::vector<uint32_t> sources = getSources();
                if (sources.size() != 1) {
                    for (uint32_t source : sources) {
                        if (source != inputPosition) {
                            return std::vector<uint32_t> {POTENTIAL_FASTER_HORSE_CODE, source + 1, inputPosition + 1};
                        }
                    }
                }
                if (sources[0] != inputPosition) {
                    return std::vector<uint32_t> {DEFINITE_FASTER_HORSE_CODE, sources[0] + 1, inputPosition + 1};
                }
                horses[sources[0]]->isDeleted = true;
            }
            return std::vector<uint32_t> {HORSE_ORDER_CORRECT_CODE, 0, 0};
        }

        void resetDeletedHorses() {
            for (Horse* horse : horses) {
                horse->isDeleted = false;
            }
        }

        void resetAndRandomizeHorses(uint32_t randState) {
            for (Horse* horse : horses) {
                horse->isDeleted = false;
                horse->resetSlowerThan();
            }
            randomizeHorseOrder(randState, NUM_SHUFFLES);
        }

    private:
        void randomizeHorseOrder(uint32_t state, uint32_t num_shuffles) {
            uint32_t idx1 {};
            uint32_t idx2 {};
            for(size_t i {0}; i < num_shuffles; i++) {
                state = puzzleUtils::randomizer(state);
                idx1 = state % 25;
                state = puzzleUtils::randomizer(state);
                idx2 = state % 25;
                if (idx1 == idx2) {
                    continue;
                }
                horses[idx1]->absolutePosition = horses[idx1]->absolutePosition ^ horses[idx2]->absolutePosition;
                horses[idx2]->absolutePosition = horses[idx1]->absolutePosition ^ horses[idx2]->absolutePosition;
                horses[idx1]->absolutePosition = horses[idx1]->absolutePosition ^ horses[idx2]->absolutePosition;
            }
        }
        
        std::vector<uint32_t> getOrder(std::vector<uint32_t> inputHorses) {
            std::vector<uint32_t> orderedHorses;
            uint32_t min {NUM_TOTAL_HORSES + 1};
            uint32_t horseToInsert {};
            for(size_t i {0}; i < inputHorses.size(); i++) {
                for(uint32_t curHorseIdx : inputHorses) {
                    uint32_t curHorseAbsolutePosition = horses[curHorseIdx]->absolutePosition;
                    if (curHorseAbsolutePosition < min && (orderedHorses.size() == 0 || curHorseAbsolutePosition > horses[orderedHorses.back()]->absolutePosition)) {
                        min = curHorseAbsolutePosition;
                        horseToInsert = curHorseIdx;
                    }
                }
                min = NUM_TOTAL_HORSES + 1;
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
            for(uint32_t i {0}; i < NUM_TOTAL_HORSES; i++) {
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

HorseRiddle& getHorseRiddle() {
    static HorseRiddle horseRiddle;
    return horseRiddle;
}

[[clang::export_name("resetHorsePuzzle")]]
void initPuzzle(uint32_t state) {
    HorseRiddle horseRiddle = getHorseRiddle();
    horseRiddle.resetAndRandomizeHorses(state);
}

[[clang::export_name("resetAndRandomizeHorses")]]
void resetAndRandomizeHorses(uint32_t randState) {
    HorseRiddle horseRiddle = getHorseRiddle();
    horseRiddle.resetAndRandomizeHorses(randState);
}

[[clang::export_name("submitRace")]]
uint32_t submitRace(uint32_t input) {
    HorseRiddle horseRiddle = getHorseRiddle();
    std::vector<uint32_t> horsesToRace = puzzleUtils::convertIntToVec(input, NUM_HORSES_PER_RACE, NUM_BITS_PER_HORSE);
    std::vector<uint32_t> raceResults = horseRiddle.submitRace(horsesToRace);
    return puzzleUtils::convertVecToInt(raceResults, NUM_BITS_PER_HORSE);
}

[[clang::export_name("checkHorseRiddleAnswer")]]
uint32_t checkAnswer(uint32_t input) {
    HorseRiddle horseRiddle = getHorseRiddle();
    std::vector<uint32_t> submittedHorses = puzzleUtils::convertIntToVec(input, NUM_HORSES_TO_SUBMIT, NUM_BITS_PER_HORSE);
    std::vector<uint32_t> answer = horseRiddle.checkAnswer(submittedHorses);
    horseRiddle.resetDeletedHorses();
    return puzzleUtils::convertVecToInt(answer, NUM_BITS_PER_HORSE);
}    
