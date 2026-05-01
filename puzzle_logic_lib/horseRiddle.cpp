#include "puzzleUtils.h"
#include <vector>

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

        Horse(uint32_t absolutePosition) : absolutePosition {absolutePosition} {}

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
};

class HorseRiddle {
    public:
        Horse* horses[25] {nullptr};

        HorseRiddle(uint32_t randState) {
            initHorses();
            randomizeHorseOrder(randState);
        }

        void initHorses() {
            for (uint32_t i {0}; i < NUM_TOTAL_HORSES; i++) {
                horses[i] = new Horse(i);
            }
        }
    
        std::vector<uint32_t> raceHorses(std::vector<uint32_t> inputHorses) {
            std::vector<uint32_t> orderedHorses = getOrder(inputHorses);
            return orderedHorses;
        }

        std::vector<uint32_t> checkAnswer(std::vector<uint32_t> inputPositions, uint32_t* submittedRaces, uint32_t numRaces) {
            for (uint32_t i {0}; i < numRaces; i++) {
                std::vector<uint32_t> submittedRace = puzzleUtils::convertIntToVec(submittedRaces[i], NUM_HORSES_PER_RACE, NUM_BITS_PER_HORSE);
                updateOrderGraph(submittedRace);
            }
            
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

    private:
        void randomizeHorseOrder(uint32_t state) {
            for(uint32_t i = NUM_TOTAL_HORSES - 1; i > 0; i--) {
                state = puzzleUtils::randomizer(state);
                uint32_t j = state % (i + 1);
                Horse* temp = horses[i];
                horses[i] = horses[j];
                horses[j] = temp;
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

extern "C" {
    __attribute__((visibility("default"))) uint32_t submitRace(uint32_t randState, uint32_t input) {
        HorseRiddle horseRiddle(randState);
        std::vector<uint32_t> horsesToRace = puzzleUtils::convertIntToVec(input, NUM_HORSES_PER_RACE, NUM_BITS_PER_HORSE);
        std::vector<uint32_t> raceResults = horseRiddle.raceHorses(horsesToRace);
        return puzzleUtils::convertVecToInt(raceResults, NUM_BITS_PER_HORSE);
    }
}

extern "C" {
    __attribute__((visibility("default"))) uint32_t checkHorseRiddleAnswer(uint32_t randState, uint32_t fastestHorsesInt, uint32_t* submittedRaces, uint32_t numRaces) {
        HorseRiddle horseRiddle(randState);
        std::vector<uint32_t> fastestHorses = puzzleUtils::convertIntToVec(fastestHorsesInt, NUM_HORSES_TO_SUBMIT, NUM_BITS_PER_HORSE);
        std::vector<uint32_t> answer = horseRiddle.checkAnswer(fastestHorses, submittedRaces, numRaces);
        // horseRiddle.resetDeletedHorses();
        return puzzleUtils::convertVecToInt(answer, NUM_BITS_PER_HORSE);
    }
}    