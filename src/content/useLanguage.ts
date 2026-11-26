import { useSyncExternalStore } from "react";
import type { Language } from "./home";

const STORAGE_KEY = "lang";

// Вибір мови живе в localStorage (як на старому сайті) і в пам'яті, якщо сховище недоступне.
let current: Language | null = null;
const listeners = new Set<() => void>();

function readStored(): Language {
  try {
    return localStorage.getItem(STORAGE_KEY) === "UA" ? "UA" : "EN";
  } catch {
    return "EN";
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

const getSnapshot = (): Language => current ?? readStored();
// На сервері й при першому рендері клієнта мова англійська (основна), щоб не було розбіжності розмітки.
const getServerSnapshot = (): Language => "EN";

export function useLanguage() {
  const language = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setLanguage = (next: Language) => {
    current = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* сховище недоступне: мова просто не збережеться між візитами */
    }
    listeners.forEach((listener) => listener());
  };

  return [language, setLanguage] as const;
}
