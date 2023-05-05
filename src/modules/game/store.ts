import { create, StateCreator } from "zustand";

export interface Cell {
  flipped: boolean;
  value: number;
}

export interface GameMove {
  pickedCard1?: number;
  pickedCard2?: number;
}

export interface GameState {
  cells: Cell[];
  moves: GameMove[];
}

export interface GameActions {
  reset: (width: number, height: number) => void;
  flipCell: (i: number, flipped?: boolean) => void;
  flipAll: (flipped: boolean) => void;
  pickCard: (value: number) => void;
  isMoveCorrect: (move: GameMove) => boolean;
  isMoveComplete: (move: GameMove) => boolean;
  isGameComplete: () => boolean;
}

export type GameSlice = GameState & GameActions;

export const createGameStore: StateCreator<GameSlice> = (set, get) => ({
  cells: [],
  moves: [],
  isGameComplete: () => {
    const { cells, moves } = get();
    return cells.every(({ flipped }) => !flipped) && moves.length > 0;
  },
  isMoveComplete: (move: GameMove) => {
    return move.pickedCard1 !== undefined && move.pickedCard2 !== undefined;
  },
  isMoveCorrect: (move: GameMove) => {
    const { cells } = get();

    if (move.pickedCard1 !== undefined && move.pickedCard2 !== undefined) {
      const pickedCard1Value = cells[move.pickedCard1].value;
      const pickedCard2Value = cells[move.pickedCard2].value;

      const isMoveCorrect = pickedCard1Value === pickedCard2Value;
      return isMoveCorrect;
    } else {
      return false;
    }
  },
  pickCard: (value: number) => {
    const { moves } = get();
    const lastMove = moves.slice(-1)[0];

    // If this is the first move, or if the last move was completed (two cards picked)
    if (!lastMove || lastMove.pickedCard2 !== undefined) {
      set({ moves: moves.concat({ pickedCard1: value }) });
    } else {
      // if last move exists and it's not completed
      const newMoves = [...moves];
      newMoves[newMoves.length - 1].pickedCard2 = value;
      set({ moves: newMoves });
    }
  },
  flipAll: (flipped: boolean) => {
    return set((state) => {
      return {
        ...state,
        cells: [...state.cells.map((c) => ({ ...c, flipped }))],
      };
    });
  },
  flipCell: (i, flipped) => {
    return set((state) => {
      const newCells = [...state.cells];
      newCells[i].flipped = flipped ?? !newCells[i].flipped;
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

    set({ cells, moves: [] });
  },
});

export const useGameStore = create(createGameStore);
