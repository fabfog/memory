import {
  MAX_BOARD_HEIGHT,
  MAX_BOARD_WIDTH,
  MIN_BOARD_HEIGHT,
  MIN_BOARD_WIDTH,
} from "./constants";

export function getValidBoardWidth(width: number) {
  return Math.max(Math.min(width, MAX_BOARD_WIDTH), MIN_BOARD_WIDTH);
}

export function getValidBoardHeight(height: number) {
  return Math.max(Math.min(height, MAX_BOARD_HEIGHT), MIN_BOARD_HEIGHT);
}
