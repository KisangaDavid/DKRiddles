'use client'

import { useState, useLayoutEffect } from 'react';
import wretch, { Wretch, WretchError } from "wretch";
import { AuthActions } from "@/src/app/auth/utils";

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

const { handleJWTRefresh, storeToken, getToken, removeTokens } = AuthActions();

const api = () => {
  const accessToken = getToken("access");
  const baseApi = wretch("https://localhost:8000");

  if (!accessToken) return baseApi.catcherFallback((err) => {console.log(err)});

  return baseApi
    .auth(`Bearer ${accessToken}`)
    .catcher(401, async (_error: WretchError, request: Wretch) => {
      try {
        const { access } = await handleJWTRefresh().json() as { access: string };
        storeToken(access, "access");
        return request
          .auth(`Bearer ${access}`)
          .fetch()
          .unauthorized(() => {
            removeTokens();
            window.location.replace("/");
          })
          .json();
      } catch (err) {
        alert("Session expired. Please log in again.");
        removeTokens();
        window.location.replace("/auth/login");
        throw err; 
      }
    });
};

export const fetcher = (url: string): Promise<any> => {
  return api().url(url).get().json();
};

export const poster = (url: string, body: Record<string, any>): Promise<any> => {
  return api().url(url).post(body).json();
};