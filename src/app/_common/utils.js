'use client'

import { createContext, useState, useLayoutEffect } from 'react';

export const SOLVED = "S"
export const MAX_32_BIT_NUM = 0xffffffff;
export const RAT_PUZZLE_P1 = "RAT_P1";
export const RAT_PUZZLE_P2 = "RAT_P2";
export const HORSE_PUZZLE = "HORSE";
export const ROOSTER_PUZZLE = "ROOSTER";
export const ALL_PUZZLES = [RAT_PUZZLE_P1, RAT_PUZZLE_P2, HORSE_PUZZLE, ROOSTER_PUZZLE]

export const githubLink = "https://github.com/KisangaDavid/DKRiddles"
export const blogLink = "https://blog.dkisanga.com"
export const ratBlogLink = "https://blog.dkisanga.com/ratRiddle/"
export const horseBlogLink = "https://blog.dkisanga.com/horseRiddle/"
export const roosterBlogLink = "https://blog.dkisanga.com/roosterRiddle/"


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

export function getConfettiHeight() {
    const rootElement = document.getElementById('root');
    return rootElement ? rootElement.clientHeight : 0;
}

export function getConfettiWidth() {
    return document.body ? document.body.clientWidth : 0;
}

export function useConfettiSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([getConfettiWidth(), getConfettiHeight()]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}


export const SolvedPuzzlesContext = createContext(new Set());

export const WasmContext = createContext(null);