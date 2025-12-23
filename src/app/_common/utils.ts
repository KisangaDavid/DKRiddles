'use client'

import { createContext, useState, useLayoutEffect } from 'react';

export const SOLVED = "S"
export const MAX_32_BIT_NUM = 0xffffffff;
export const RAT_PUZZLE_P1 = "RAT_P1";
export const RAT_PUZZLE_P2 = "RAT_P2";
export const HORSE_PUZZLE = "HORSE";
export const ROOSTER_PUZZLE = "ROOSTER";
export const RABBIT_PUZZLE = "RABBIT"
export const ALL_PUZZLES = [RAT_PUZZLE_P1, RAT_PUZZLE_P2, HORSE_PUZZLE, ROOSTER_PUZZLE, RABBIT_PUZZLE];

export const blogLink = "https://blog.dkisanga.com";
export const ratBlogLink = "https://blog.dkisanga.com/ratRiddle/";
export const horseBlogLink = "https://blog.dkisanga.com/horseRiddle/";
export const roosterBlogLink = "https://blog.dkisanga.com/roosterRiddle/";
export const rabbitBlogLink = "https://blog.dkisanga.com/rabbitRiddle/";

export const shortImageZoom = 500;
export const shortImageFade = 750;
export const standardTextFade = 1000;
export const longTextFade = 2000;
export const standardImageFade = 1500;

export const shortDelay = 200;
export const standardDelay = 250;
export const longDelay = 500;
export const extraLongDelay = 750;


export function convertIterableToInt(iterable: Iterable<number>, numBitsPerElement: number) {
    let intRepresentation = 0;
    for (const element of iterable) {
      intRepresentation <<= numBitsPerElement;
      intRepresentation = intRepresentation | element;
    }
    return intRepresentation;
}

export function convertIntToArray(intRepresentation: number, numBitsPerElement: number, length: number) {
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

interface solvedPuzzlesContext {
  solvedPuzzles: Set<string>;
  setSolvedPuzzles: (puzzles: Set<string>) => void;
} 

export const SolvedPuzzlesContext = createContext<solvedPuzzlesContext>({
  solvedPuzzles: new Set<string>(),
  setSolvedPuzzles: () => {}
});

interface wasmContext {
  wasmExports: WebAssembly.Exports | null;
} 

export const WasmContext = createContext<wasmContext>({ wasmExports: null });