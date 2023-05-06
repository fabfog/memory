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

export type BoardSetupStrategy = (initialCells: number[]) => number[];

const shuffleCells: BoardSetupStrategy = (initialCells) =>
  initialCells.sort(() => (Math.random() > 0.5 ? 1 : -1));

export interface GameActions {
  reset: (
    width: number,
    height: number,
    boardSetupStrategyFn?: BoardSetupStrategy
  ) => void;
  flipCell: (i: number, flipped?: boolean) => void;
  flipAll: (flipped: boolean) => void;
  pickCard: (value: number) => void;
  isMoveCorrect: (move: GameMove) => boolean;
  isMoveComplete: (move: GameMove) => boolean;
  isGameComplete: () => boolean;
}

export type GameSlice = GameState & GameActions;

function flipSingleCell(cells: Cell[], i: number, flipped?: boolean): Cell[] {
  const newCells = [...cells];
  newCells[i].flipped = flipped ?? !newCells[i].flipped;
  return newCells;
}

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
    const { moves, cells } = get();
    const lastMove = moves.slice(-1)[0];
    const newCells = flipSingleCell(cells, value, false);

    const newMoves = [...moves];
    // If this is the first move, or if the last move was completed (two cards picked)
    if (!lastMove || lastMove.pickedCard2 !== undefined) {
      newMoves.push({ pickedCard1: value });
    } else {
      // if last move exists and it's not completed
      newMoves[newMoves.length - 1].pickedCard2 = value;
    }
    set({ cells: newCells, moves: newMoves });
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
    return set((state) => ({
      ...state,
      cells: flipSingleCell(state.cells, i, flipped),
    }));
  },
  reset: (width, height, boardSetupStrategyFn) => {
    const size = width * height;
    const maxCardValue = size / 2;
    const cardValues = new Array(maxCardValue).fill(0).map((_, i) => i);

    // obtain duplicates
    const initialCells = cardValues.concat(cardValues);

    // mix values according to external strategy or shuffle (default)
    const cellsValues = (boardSetupStrategyFn ?? shuffleCells)(initialCells);

    const cells: Cell[] = cellsValues.map((value) => ({
      value,
      flipped: false,
    }));

    const newState: GameState = { cells, moves: [] };

    set(newState);
  },
});

export const useGameStore = create(createGameStore);
