"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { ALL_PUZZLES, SOLVED } from "./constants";

interface SolvedPuzzlesContextType {
  markSolved: (id: string) => void;
  clearSolvedPuzzles: () => void;
  isSolved: (id: string) => boolean;
}

export const SolvedPuzzlesContext = createContext<SolvedPuzzlesContextType>({
  markSolved: () => {},
  clearSolvedPuzzles: () => {},
  isSolved: () => false,
});

export const SolvedPuzzlesContextProvider = ({children}: {children: ReactNode}) => {
    const [solvedPuzzles, setSolvedPuzzles] = useState<Set<string>>(() => {
        if (typeof window === "undefined") 
            return new Set();
        const puzzleState = new Set<string>();
        ALL_PUZZLES.forEach((puzzle) => {
        if (localStorage.getItem(puzzle) === SOLVED) {
            puzzleState.add(puzzle);
        }});
        return puzzleState;
    });

    const markSolved = (id: string) => {
        setSolvedPuzzles((prev) => {
            const newSolvedPuzzles = new Set(prev);
            newSolvedPuzzles.add(id);
            localStorage.setItem(id, SOLVED);
            return newSolvedPuzzles;
        });
    };

    const clearSolvedPuzzles = () => {
        setSolvedPuzzles(new Set());
        ALL_PUZZLES.forEach((id) => localStorage.removeItem(id));
    };

    const isSolved = (puzzle: string) => {
        return solvedPuzzles.has(puzzle);
    };

  return (
    <SolvedPuzzlesContext.Provider value={{markSolved, clearSolvedPuzzles, isSolved}}>
      {children}
    </SolvedPuzzlesContext.Provider>
  );
};