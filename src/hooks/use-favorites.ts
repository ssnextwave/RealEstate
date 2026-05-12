import { useEffect, useState, useCallback } from "react";

const KEY = "maison.favorites";
const RECENT_KEY = "maison.recent";

function read(key: string): string[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(key) || "[]"); } catch { return []; }
}
function write(key: string, val: string[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(val));
  window.dispatchEvent(new StorageEvent("storage", { key }));
}

export function useFavorites() {
  const [ids, setIds] = useState<string[]>([]);
  useEffect(() => {
    setIds(read(KEY));
    const sync = () => setIds(read(KEY));
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  const toggle = useCallback((id: string) => {
    const next = ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id];
    write(KEY, next);
    setIds(next);
  }, [ids]);
  return { ids, toggle, has: (id: string) => ids.includes(id) };
}

export function useRecent() {
  const [ids, setIds] = useState<string[]>([]);
  useEffect(() => { setIds(read(RECENT_KEY)); }, []);
  const push = useCallback((id: string) => {
    const cur = read(RECENT_KEY).filter((x) => x !== id);
    const next = [id, ...cur].slice(0, 6);
    write(RECENT_KEY, next);
    setIds(next);
  }, []);
  return { ids, push };
}
