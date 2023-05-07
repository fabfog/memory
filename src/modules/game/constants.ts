export const DEFAULT_CARD_WIDTH: number =
  +process.env.NEXT_PUBLIC_DEFAULT_CARD_WIDTH!;
export const DEFAULT_CARD_HEIGHT: number =
  +process.env.NEXT_PUBLIC_DEFAULT_CARD_HEIGHT!;

export const DEFAULT_BOARD_WIDTH: number =
  +process.env.NEXT_PUBLIC_DEFAULT_BOARD_WIDTH!;
export const DEFAULT_BOARD_HEIGHT: number =
  +process.env.NEXT_PUBLIC_DEFAULT_BOARD_HEIGHT!;

export const MIN_BOARD_WIDTH: number =
  +process.env.NEXT_PUBLIC_MIN_BOARD_WIDTH!;
export const MAX_BOARD_WIDTH: number =
  +process.env.NEXT_PUBLIC_MAX_BOARD_WIDTH!;
export const MIN_BOARD_HEIGHT: number =
  +process.env.NEXT_PUBLIC_MIN_BOARD_HEIGHT!;
export const MAX_BOARD_HEIGHT: number =
  +process.env.NEXT_PUBLIC_MAX_BOARD_HEIGHT!;

export const LS_OPTIONS_KEY = process.env.NEXT_PUBLIC_LS_OPTIONS_KEY!;

export const allowedGridDimensionsOptions: Array<{
  w: number;
  h: number;
  isDefault?: true;
}> = [
  { w: 2, h: 2 },
  { w: 2, h: 3 },
  { w: 3, h: 4, isDefault: true },
  { w: 4, h: 4 },
  { w: 4, h: 5 },
  { w: 5, h: 6 },
];
