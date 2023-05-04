import { create, StateCreator } from "zustand";

export interface Cell {
  flipped: boolean;
  value: number;
}

export interface GameState {
  cells: Cell[];
}

export interface GameActions {
  reset: (width: number, height: number, numberOfCards: number) => void;
  getCell: (i: number, j: number) => Cell;
  flipCell: (i: number, j: number) => void;
}

export type GameSlice = GameState & GameActions;

export const createGameStore: StateCreator<GameSlice> = (set, get) => ({
  cells: [],
  getCell: (i, j) => {
    return get().cells[i * j];
  },
  flipCell: (i, j) => {
    return set((state) => {
      const newCells = [...state.cells];
      newCells[i * j].flipped = !newCells[i * j].flipped;
      return {
        ...state,
        cells: newCells,
      };
    });
  },
  reset: (width, height, numberOfCards) => {
    const size = width * height;
    const cells: Cell[] = [];
    for (let i = 0; i < size; i++) {
      cells.push({
        value: Math.floor(Math.random() * numberOfCards),
        flipped: false,
      });
    }
    set({ cells });
  },
});

export const useGameStore = create(createGameStore);
