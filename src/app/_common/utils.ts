'use client'
// TODO: make this not a client component

import { createContext, useState, useLayoutEffect } from 'react';
import wretch, { Wretch, WretchError } from "wretch";
import { AuthActions } from "@/src/app/auth/utils";


export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

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

const { handleJWTRefresh, storeToken, getToken } = AuthActions();

const api = () => {
  return (
    wretch("http://localhost:8000") // Change this?
      // Initialize authentication with the access token.
      .auth(`Bearer ${getToken("access")}`)
      // Catch 401 errors to refresh the token and retry the request.
      .catcher(401, async (error: WretchError, request: Wretch) => {
        try {
          // Attempt to refresh the JWT token.
          const { access } = (await handleJWTRefresh().json()) as {
            access: string;
          };

          // Store the new access token.
          storeToken(access, "access");

          // Replay the original request with the new access token.
          return request
            .auth(`Bearer ${access}`)
            .fetch()
            .unauthorized(() => {
              window.location.replace("/");
            })
            .json();
        } catch (err) {
          console.log("err with the request in fetcher" + err);
        }
      })
  );
};

export const fetcher = (url: string): Promise<any> => {
  return api().get(url).json();
};
