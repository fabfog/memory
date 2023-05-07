import { LS_OPTIONS_KEY } from "./constants";
import { GameOptionsForm } from "./hooks/useGameOptionsForm";

export function areBoardDimensionsValid(
  boardWidth: number,
  boardHeight: number
) {
  return (boardWidth * boardHeight) % 2 === 0;
}

export function isLocalStorageAvailable() {
  return typeof window !== "undefined" && window.localStorage;
}

export function getSavedOptions() {
  if (isLocalStorageAvailable()) {
    const savedOptions = localStorage.getItem(LS_OPTIONS_KEY) ?? "{}";
    return JSON.parse(savedOptions);
  }
  return {};
}

export function saveOptions(options: GameOptionsForm) {
  if (isLocalStorageAvailable()) {
    localStorage.setItem(LS_OPTIONS_KEY, JSON.stringify(options));
  }
}

export function getIntegersInRange(from: number, to: number) {
  return new Array(to - from + 1).fill(0).map((_, i) => i + from);
}
