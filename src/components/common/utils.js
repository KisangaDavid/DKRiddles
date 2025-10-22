import { createContext } from 'react';

export const MAX_32_BIT_NUM = 0xffffffff;

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
