import { createContext } from 'react';

export const MAX_32_BIT_NUM = 0xffffffff;

// Puzzle completion status constants
export const RAT_PUZZLE_BASE_SOLVED = "Rat puzzle base solved";
export const RAT_PUZZLE_BONUS_SOLVED = "Rat puzzle bonus solved";
export const HORSE_PUZZLE_SOLVED = "Horse puzzle solved";
export const ROOSTER_PUZZLE_SOLVED = "Rooster puzzle solved";

export function convertIterableToInt(iterable, numBitsPerElement) {
    let intRepresentation = 0;
    for (const element of iterable) {
      intRepresentation <<= numBitsPerElement;
      intRepresentation = intRepresentation | element;
    }
    return intRepresentation;
}

export function convertIntToArray(intRepresentation, numBitsPerElement, length) {
    let array = [];
    let bitmask = (1 << numBitsPerElement) - 1;
    for (let i = 0; i < length; i++) {
        array.push(intRepresentation & bitmask);
        intRepresentation >>= numBitsPerElement;
    }
    return array
}

export const SolvedPuzzlesContext = createContext(new Set());
