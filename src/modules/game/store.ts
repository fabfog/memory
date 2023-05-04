import { create, StateCreator } from "zustand";

export interface Cell {
  flipped: boolean;
  value: number;
}

export interface GameState {
  cells: Cell[];
}

export interface GameActions {
  reset: (width: number, height: number) => void;
  flipCell: (i: number) => void;
  flipAll: (flipped: boolean) => void;
}

export type GameSlice = GameState & GameActions;

export const createGameStore: StateCreator<GameSlice> = (set) => ({
  cells: [],
  flipAll: (flipped: boolean) => {
    return set((state) => {
      return {
        ...state,
        cells: [...state.cells.map((c) => ({ ...c, flipped }))],
      };
    });
  },
  flipCell: (i) => {
    return set((state) => {
      const newCells = [...state.cells];
      newCells[i].flipped = !newCells[i].flipped;
      return {
        ...state,
        cells: newCells,
      };
    });
  },
  reset: (width, height) => {
    const size = width * height;
    const maxCardValue = size / 2;
    const cardValues = new Array(maxCardValue).fill(0).map((_, i) => i);

    const cellsValues = cardValues
      .concat(cardValues) // obtain duplicates
      .sort(() => (Math.random() > 0.5 ? 1 : -1)); // shuffle array randomly

    const cells: Cell[] = cellsValues.map((value) => ({
      value,
      flipped: false,
    }));

    set({ cells });
  },
});

export const useGameStore = create(createGameStore);
