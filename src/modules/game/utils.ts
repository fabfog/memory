import { LS_OPTIONS_KEY } from "./constants";
import { GameOptionsForm } from "./hooks/useGameOptionsForm";

export function areBoardDimensionsValid(
  boardWidth: number,
  boardHeight: number
) {
  return (boardWidth * boardHeight) % 2 === 0;
}

export function getSavedOptions() {
  const savedOptions = localStorage.getItem(LS_OPTIONS_KEY) ?? "{}";
  return JSON.parse(savedOptions);
}

export function saveOptions(options: GameOptionsForm) {
  localStorage.setItem(LS_OPTIONS_KEY, JSON.stringify(options));
}
