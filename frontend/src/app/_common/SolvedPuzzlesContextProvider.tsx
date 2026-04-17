"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { ALL_PUZZLES, SOLVED } from "./constants";

interface SolvedPuzzlesContextType {
  markSolved: (id: string) => void;
  clearSolvedPuzzles: () => void;
  isSolved: (id: string) => boolean;
  resetSolvedPuzzles: (puzzles: Record<string, string>) => void;
}

export const SolvedPuzzlesContext = createContext<SolvedPuzzlesContextType>({
  markSolved: () => {},
  clearSolvedPuzzles: () => {},
  isSolved: () => false,
  resetSolvedPuzzles: () => {},
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

      const resetSolvedPuzzles = (puzzles: Record<string, string>) => {
        ALL_PUZZLES.forEach((id) => localStorage.removeItem(id));
        const newSolvedPuzzles = new Set<string>();
        Object.keys(puzzles).forEach(key => {
            newSolvedPuzzles.add(key);
            localStorage.setItem(key, SOLVED);
        });
        setSolvedPuzzles(newSolvedPuzzles);
      };

    const isSolved = (puzzle: string) => {
        return solvedPuzzles.has(puzzle);
    };

  return (
    <SolvedPuzzlesContext.Provider value={{markSolved, clearSolvedPuzzles, isSolved, resetSolvedPuzzles}}>
      {children}
    </SolvedPuzzlesContext.Provider>
  );
};